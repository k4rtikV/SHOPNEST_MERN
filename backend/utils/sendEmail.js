const sendEmail = async (to, subject, text) => {
    if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY is not configured");
    }

    if (!process.env.BREVO_SENDER_EMAIL) {
        throw new Error("BREVO_SENDER_EMAIL is not configured");
    }

    if (!to) {
        throw new Error("Email recipient is required");
    }

    if (!subject) {
        throw new Error("Email subject is required");
    }

    if (!text) {
        throw new Error("Email content is required");
    }

    const response = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: {
                    name:
                        process.env.BREVO_SENDER_NAME ||
                        "ShopNest",
                    email: process.env.BREVO_SENDER_EMAIL,
                },
                to: [
                    {
                        email: to,
                    },
                ],
                subject,
                textContent: text,
            }),
        }
    );

    let responseData;

    try {
        responseData = await response.json();
    } catch {
        responseData = {};
    }

    if (!response.ok) {
        const errorMessage =
            responseData.message ||
            `Brevo request failed with status ${response.status}`;

        throw new Error(errorMessage);
    }

    console.log(
        `Brevo email accepted for ${to}. Message ID: ${responseData.messageId}`
    );

    return responseData;
};

module.exports = sendEmail;