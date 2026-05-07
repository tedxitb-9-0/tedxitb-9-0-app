import { eq, and } from "drizzle-orm";
import { Resend } from "resend";
import { createElement, type ReactElement } from "react";

const EMAIL_HEADER_URL = "https://tedxitb.id/email-header.png";

function MainEventBlastEmail(): ReactElement {
  return createElement(
    "div",
    {
      style: {
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
        lineHeight: 1.6,
        maxWidth: "640px",
        margin: "0 auto",
      },
    },
    createElement("img", {
      src: EMAIL_HEADER_URL,
      alt: "TEDxITB Main Event Header",
      style: {
        display: "block",
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        marginBottom: "20px",
      },
    }),
    createElement("p", null, "Dear Participant,"),
    createElement(
      "p",
      null,
      "We would like to inform you about the details of the upcoming Main Event TEDxITB.",
    ),
    createElement(
      "p",
      null,
      createElement("strong", null, "Date:"),
      " 10 May 2026",
      createElement("br"),
      createElement("strong", null, "Time:"),
      " 12:00 PM \u2013 19.30 PM WIB",
      createElement("br"),
      createElement("strong", null, "Location:"),
      " Graha Pos Indonesia",
    ),
    createElement(
      "p",
      null,
      "We are excited to have you join us for a series of engaging seminars, performances, and sessions prepared for you. We hope you are looking forward to the experience.",
    ),
    createElement("p", null, "See you there."),
    createElement(
      "p",
      null,
      "Best regards,",
      createElement("br"),
      "TEDxITB Committee",
    ),
  );
}

async function main() {
  const { env } = await import("~/env");
  const { db } = await import("~/server/db");
  const { orders, user } = await import("~/server/db/schema");

  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.error("Missing RESEND_API_KEY or EMAIL_FROM in environment");
    process.exit(1);
  }

  const resendApiKey = env.RESEND_API_KEY;
  const emailFrom = env.EMAIL_FROM;
  const resend = new Resend(resendApiKey);

  // Support --to <email> flag for test sends
  const toFlagIndex = process.argv.indexOf("--to");
  const testEmail = toFlagIndex !== -1 ? process.argv[toFlagIndex + 1] : null;

  let uniqueEmails: string[];

  if (testEmail) {
    console.log(`[TEST MODE] Sending only to: ${testEmail}`);
    uniqueEmails = [testEmail];
  } else {
    console.log("Fetching users with confirmed main event tickets...");

    const confirmedOrders = await db
      .select({
        email: user.email,
      })
      .from(orders)
      .innerJoin(user, eq(orders.userId, user.id))
      .where(
        and(
          eq(orders.orderType, "main_event_ticket"),
          eq(orders.status, "confirmed"),
        ),
      );

    uniqueEmails = [...new Set(confirmedOrders.map((o) => o.email))];
    console.log(
      `Found ${uniqueEmails.length} unique emails. Sending blast emails...`,
    );
  }

  let successCount = 0;
  let failCount = 0;

  for (const email of uniqueEmails) {
    try {
      const { error } = await resend.emails.send({
        from: emailFrom,
        to: email,
        subject: "Main Event TEDxITB – Event Details",
        react: MainEventBlastEmail(),
      });

      if (error) {
        console.error(`Failed to send to ${email}:`, error);
        failCount++;
      } else {
        console.log(`Sent to ${email}`);
        successCount++;
      }
    } catch (e) {
      console.error(`Error sending to ${email}:`, e);
      failCount++;
    }

    // Small delay to avoid hitting Resend rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(
    `Finished sending emails. Success: ${successCount}, Failed: ${failCount}`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
