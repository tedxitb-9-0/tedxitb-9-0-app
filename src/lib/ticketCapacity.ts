import {
  isTicketPresaleActive,
  TICKET_EARLY_BIRD_PRICE_IDR,
  TICKET_REGULAR_BUNDLE_TOTAL_IDR,
  TICKET_REGULAR_PRICE_IDR,
} from "~/lib/ticketPricing";

/** Max early-bird orders while presale window is active (separate from regular pool). */
export const TICKET_PRESALE_CAP = 30;

/** Max regular-price orders (30 presale + 140 regular = 170 total capacity). */
export const TICKET_REGULAR_CAP = 140;

export const TICKET_TOTAL_CAP = TICKET_PRESALE_CAP + TICKET_REGULAR_CAP;

/** Start of the current calendar day in Asia/Jakarta (WIB). */
export function startOfTodayWib(now: Date = new Date()): Date {
  const wibDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return new Date(`${wibDate}T00:00:00+07:00`);
}

export function inferTicketTier(order: {
  ticketJson: unknown;
  totalAmount: number;
}): "Early Bird" | "Regular" {
  const j = order.ticketJson as { tier?: string } | null;
  if (j && typeof j === "object") {
    if (j.tier === "Early Bird") return "Early Bird";
    if (j.tier === "Regular") return "Regular";
  }
  if (order.totalAmount === TICKET_EARLY_BIRD_PRICE_IDR) return "Early Bird";
  if (order.totalAmount === TICKET_REGULAR_PRICE_IDR) return "Regular";
  if (order.totalAmount === TICKET_REGULAR_BUNDLE_TOTAL_IDR) return "Regular";
  return "Regular";
}

/** Seats consumed toward capacity (main-event 2-person bundle = 2 regular slots). */
export function getTicketSlotCount(order: {
  ticketJson: unknown;
  totalAmount: number;
}): number {
  const j = order.ticketJson as { bundle?: string } | null;
  if (j && typeof j === "object" && j.bundle === "two_person") return 2;
  if (order.totalAmount === TICKET_REGULAR_BUNDLE_TOTAL_IDR) return 2;
  return 1;
}

export function partitionTicketsByTier(
  orders: Array<{ ticketJson: unknown; totalAmount: number }>,
): { earlyBirdCount: number; regularCount: number } {
  let earlyBirdCount = 0;
  let regularCount = 0;
  for (const o of orders) {
    const tier = inferTicketTier(o);
    const slots = getTicketSlotCount(o);
    if (tier === "Early Bird") earlyBirdCount += slots;
    else regularCount += slots;
  }
  return { earlyBirdCount, regularCount };
}

/**
 * Next purchase tier/price: presale slots first (up to cap) while the presale window is open,
 * then regular pool (150). Orders before start of today are excluded by the caller.
 */
export function resolveNextTicketOffer(counts: {
  earlyBirdCount: number;
  regularCount: number;
}): { tier: "Early Bird" | "Regular"; priceIdr: number } | null {
  const presale = isTicketPresaleActive();
  if (presale && counts.earlyBirdCount < TICKET_PRESALE_CAP) {
    return { tier: "Early Bird", priceIdr: TICKET_EARLY_BIRD_PRICE_IDR };
  }
  if (counts.regularCount < TICKET_REGULAR_CAP) {
    return { tier: "Regular", priceIdr: TICKET_REGULAR_PRICE_IDR };
  }
  return null;
}

/** Server-only debug: watch the terminal running `next dev` (tRPC runs on the server). */
export function logTicketCapacityDebug(
  label: string,
  args: {
    startOfTodayWib?: Date;
    dbRowCount?: number;
    totalDbRowCount?: number;
    validOrderCount: number;
    earlyBirdCount: number;
    regularCount: number;
    offer: ReturnType<typeof resolveNextTicketOffer>;
  },
) {
  console.log(`[ticketCapacity] ${label}`, {
    ...(args.startOfTodayWib && { startOfTodayWib: args.startOfTodayWib.toISOString() }),
    ...(args.dbRowCount !== undefined && { dbRowCount: args.dbRowCount }),
    ...(args.totalDbRowCount !== undefined && { totalDbRowCount: args.totalDbRowCount }),
    validOrderCount: args.validOrderCount,
    earlyBirdCount: args.earlyBirdCount,
    regularCount: args.regularCount,
    presaleWindowActive: isTicketPresaleActive(),
    nextOffer: args.offer,
  });
}
