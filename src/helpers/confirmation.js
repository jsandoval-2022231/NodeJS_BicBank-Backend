import twilio from 'twilio';

export const sendConfirmationSMS = async (to, body) => {
    const accountSid =  process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    console.log('Sending SMS to:', to);
    try {
        const message = await client.messages.create({
            body: body,
            from: '+16185168543', 
            to: to
        });

        console.log('Message sent: %s', message.sid);
        return `SMS sent: ${message.sid}`;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};