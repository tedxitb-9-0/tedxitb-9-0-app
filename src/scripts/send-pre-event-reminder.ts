import { eq, and } from "drizzle-orm";
import { Resend } from "resend";
import { createElement, type ReactElement } from "react";

const EMAIL_HEADER_URL = "https://tedxitb.id/email-header.png";

function PreEventReminderEmail(): ReactElement {
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
      alt: "TEDxITB Pre-Event Header",
      style: {
        display: "block",
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        marginBottom: "20px",
      },
    }),
    createElement("p", null, "Hi everyone!"),
    createElement(
      "p",
      null,
      "Today is the day 🎉 TEDxITB 9.0 Pre-Event will be held!",
    ),
    createElement(
      "p",
      null,
      createElement("strong", null, "🗓 Date:"),
      " 28 March 2026",
      createElement("br"),
      createElement("strong", null, "🕛 Time:"),
      " 12:00 PM – 18:05 PM WIB",
      createElement("br"),
      createElement("strong", null, "📍 Location:"),
      " Aula Timur ITB",
    ),
    createElement(
      "p",
      null,
      "We’re excited to welcome all of you and hope you’re looking forward to the sessions, performances, and activities we’ve prepared ✨",
    ),
    createElement(
      "p",
      null,
      "As an update, the ticket system has been adjusted to a deposit-based system. This means that the amount you previously paid (whether Early Bird or Normal Price) will be fully refunded, and the refund process will start at 18:00 PM WIB today.",
    ),
    createElement("p", null, "See you soon and enjoy the event! 🙌"),
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

  console.log("Fetching users with confirmed pre-event tickets...");

  const confirmedOrders = await db
    .select({
      email: user.email,
    })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .where(
      and(
        eq(orders.orderType, "pre_event_ticket"),
        eq(orders.status, "confirmed"),
      ),
    );

  const uniqueEmails = [...new Set(confirmedOrders.map((o) => o.email))];

  console.log(
    `Found ${uniqueEmails.length} unique emails. Sending reminders...`,
  );

  let successCount = 0;
  let failCount = 0;

  for (const email of uniqueEmails) {
    try {
      const { error } = await resend.emails.send({
        from: emailFrom,
        to: email,
        subject: "🎉 Today is the day! TEDxITB 9.0 Pre-Event",
        react: PreEventReminderEmail(),
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

    // Optional delay to avoid hitting rate limits on Resend
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms
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
