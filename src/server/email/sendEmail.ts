import { env } from "~/env";
import { Resend } from "resend";
import type { ReactElement } from "react";

interface SendEmailInput {
    to: string;
    subject: string;
    react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailInput) {
    if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
        return {
            success: false,
            skipped: true,
            reason: "Missing RESEND_API_KEY or EMAIL_FROM",
        };
    }

    const resendApiKey = env.RESEND_API_KEY;
    const emailFrom = env.EMAIL_FROM;
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
        from: emailFrom,
        to,
        subject,
        react,
    });

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

    return {
        success: true,
        skipped: false,
    };
}

export async function sendPreEventConfirmedEmail(to: string) {
    const templateModule =
        (await import("~/server/email/preEventConfirmed")) as {
            default: () => {
                subject: string;
                react: ReactElement;
            };
        };

    const template = templateModule.default();

    return sendEmail({
        to,
        subject: template.subject,
        react: template.react,
    });
}


