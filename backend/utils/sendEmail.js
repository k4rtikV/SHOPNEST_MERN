const normaliseRecipients = (to) => {
    const recipients = Array.isArray(to) ? to : [to];

    return recipients.map((recipient) => {
        if (typeof recipient === 'string') {
            return { email: recipient };
        }

        return recipient;
    });
};

const sendEmail = async (optionsOrTo, subjectArg, textArg, htmlArg) => {
    if (!process.env.BREVO_API_KEY) {
        throw new Error('BREVO_API_KEY is not configured');
    }

    if (!process.env.BREVO_SENDER_EMAIL) {
        throw new Error('BREVO_SENDER_EMAIL is not configured');
    }

    const options =
        typeof optionsOrTo === 'object' &&
        optionsOrTo !== null &&
        !Array.isArray(optionsOrTo)
            ? optionsOrTo
            : {
                to: optionsOrTo,
                subject: subjectArg,
                text: textArg,
                html: htmlArg
            };

    const { to, subject, text, html, replyTo } = options;

    if (!to) {
        throw new Error('Email recipient is required');
    }

    if (!subject) {
        throw new Error('Email subject is required');
    }

    if (!text && !html) {
        throw new Error('Email text or HTML content is required');
    }

    const payload = {
        sender: {
            name: process.env.BREVO_SENDER_NAME || 'ShopNest',
            email: process.env.BREVO_SENDER_EMAIL
        },
        to: normaliseRecipients(to),
        subject
    };

    if (text) {
        payload.textContent = text;
    }

    if (html) {
        payload.htmlContent = html;
    }

    if (replyTo) {
        payload.replyTo =
            typeof replyTo === 'string'
                ? { email: replyTo }
                : replyTo;
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

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

    const recipientList = normaliseRecipients(to)
        .map((recipient) => recipient.email)
        .join(', ');

    console.log(
        `Brevo email accepted for ${recipientList}. Message ID: ${responseData.messageId}`
    );

    return responseData;
};

module.exports = sendEmail;
