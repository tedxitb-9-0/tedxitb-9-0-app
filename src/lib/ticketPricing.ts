/** Presale (early bird) ends when this instant is reached: start of 28 April 2026 WIB (after 27 April midnight). */
export const TICKET_PRESALE_END_WIB = new Date("2026-04-28T00:00:00+07:00");

export const TICKET_EARLY_BIRD_PRICE_IDR = 69_000;
export const TICKET_REGULAR_PRICE_IDR = 109_000;

export const TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR = 99_000;
export const TICKET_REGULAR_BUNDLE_TOTAL_IDR =
    TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR * 2;

export function isTicketPresaleActive(now: Date = new Date()): boolean {
    return now.getTime() < TICKET_PRESALE_END_WIB.getTime();
}
