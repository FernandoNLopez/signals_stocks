import nodemailer from "nodemailer";
import {NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
});

export const sendWelcomeEmail = async ({ email, name, intro } : WelcomeEmailData)  => {

    //Taking Welcome Template
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        //Replacing the placeholders
        .replace('{{name', name)
        .replace('{{intro}}', intro);

    //Defining Mail Options
    const mailOptions = {
      from: `"Signalist" <fernandolopezcontact1@gmail.com>`,
      to: email,
      subject: 'Welcome to Signalist - your stock market is ready.',
      text: 'Thanks for joining Signalist.',
      html: htmlTemplate
    };

    //SENDING EMAIL
    await transporter.sendMail(mailOptions);
};


export const sendNewsSummaryEmail = async (
    {  email, date, newsContent } : { email: string; date: string; newsContent: string }
) : Promise<void> => {

    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Signalist News" <fernandolopezcontact1@gmail.com>`,
        to: email,
        subject: `Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions);

}