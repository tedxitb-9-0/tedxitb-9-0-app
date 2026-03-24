import { createElement, type ReactElement } from "react";

const EMAIL_HEADER_URL = "https://tedxitb.id/email-header.png";

export interface ResendReactTemplate {
  subject: string;
  react: ReactElement;
}

function PreEventConfirmedEmail(): ReactElement {
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
    createElement("p", null, "Dear Participant,"),
    createElement(
      "p",
      null,
      "We would like to inform you about the details of the upcoming Pre-Event TEDxITB.",
    ),
    createElement(
      "p",
      null,
      createElement("strong", null, "Date:"),
      " 28 March 2026",
      createElement("br"),
      createElement("strong", null, "Time:"),
      " 12:00 PM - 18:30 PM WIB",
      createElement("br"),
      createElement("strong", null, "Location:"),
      " Aula Timur ITB",
    ),
    createElement(
      "p",
      null,
      "We are excited to have you join us for a series of engaging workshops, performances, and sessions prepared for you. We hope you are looking forward to the experience.",
    ),
    createElement(
      "p",
      null,
      "Just a quick update regarding the TEDxITB 9.0 Pre-Event 😊",
      createElement("br"),
      createElement("br"),
      "The ticket system has been adjusted - instead of a fixed price, it will now be deposit-based. This means you'll only need to pay a deposit to secure your spot, and it will be refunded upon your attendance at the event.",
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

const preEventConfirmedTemplate = (): ResendReactTemplate => ({
  subject: "Your Pre-Event TEDxITB Ticket Has Been Confirmed",
  react: PreEventConfirmedEmail(),
});

export default preEventConfirmedTemplate;
