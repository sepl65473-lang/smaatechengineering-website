const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = new SESClient({ region: "ap-south-1" });

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2));
    
    // Parse body if it's from API Gateway
    const body = event.body ? JSON.parse(event.body) : event;
    const { name, email, organization, message } = body;

    const params = {
        Destination: {
            ToAddresses: ["sepl65473@gmail.com"],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <h3>New Inquiry from Smaatech Engineering</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Organization:</strong> ${organization || "N/A"}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `New Project Inquiry: ${name}`,
            },
        },
        Source: "sepl65473@gmail.com", // MUST be verified in SES
    };

    try {
        await ses.send(new SendEmailCommand(params));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({ message: "Inquiry sent successfully!" }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({ message: "Failed to send inquiry", error: error.message }),
        };
    }
};
