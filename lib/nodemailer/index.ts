import nodemailer from "nodemailer";
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

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