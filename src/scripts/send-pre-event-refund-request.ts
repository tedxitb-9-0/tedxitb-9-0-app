import { Resend } from "resend";
import { createElement, type ReactElement } from "react";

const EMAIL_HEADER_URL = "https://tedxitb.id/email-header.png";

const RECIPIENTS = [
  "nicholasaragih@gmail.com"
] as const;

const SUBJECT = "TEDxITB 9.0 Pre-Event Refund Process";

function PreEventRefundRequestEmail(): ReactElement {
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
    createElement("p", null, "Hi Joy Shaper,"),
    createElement("p", null, "Hope you're doing well!"),
    createElement(
      "p",
      null,
      "As part of the TEDxITB 9.0 Pre-Event refund process, we would like to kindly ask for your bank account details so we can proceed with the refund.",
    ),
    createElement(
      "p",
      null,
      "Could you please share this information to the number of the contact person attached below:",
    ),
    createElement(
      "ul",
      null,
      createElement("li", null, "Bank name"),
      createElement("li", null, "Account number"),
      createElement("li", null, "Account holder name"),
    ),
    createElement(
      "p",
      null,
      "CP - Lindy Evania Kusnadi",
      createElement("br"),
      "Phone Number - 081774108909",
    ),
    createElement(
      "p",
      null,
      "Thank you so much for your cooperation! If you have any questions, feel free to let us know.",
    ),
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

  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.error("Missing RESEND_API_KEY or EMAIL_FROM in environment");
    process.exit(1);
  }

  const resend = new Resend(env.RESEND_API_KEY);

  let successCount = 0;
  let failCount = 0;

  console.log(`Sending refund request emails to ${RECIPIENTS.length} recipients...`);

  for (const email of RECIPIENTS) {
    try {
      const { error } = await resend.emails.send({
        from: env.EMAIL_FROM,
        to: email,
        subject: SUBJECT,
        react: PreEventRefundRequestEmail(),
      });

      if (error) {
        console.error(`Failed to send to ${email}:`, error);
        failCount++;
      } else {
        console.log(`Sent to ${email}`);
        successCount++;
      }
    } catch (error) {
      console.error(`Error sending to ${email}:`, error);
      failCount++;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(
    `Finished sending emails. Success: ${successCount}, Failed: ${failCount}`,
  );

  if (failCount > 0) {
    process.exit(1);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});