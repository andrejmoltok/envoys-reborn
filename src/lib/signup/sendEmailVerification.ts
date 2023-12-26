'use server'

// import { db } from "@/firebase/config";
// import {} from 'firebase/firestore';\
import { nanoid } from "nanoid";

var nodemailer = require("nodemailer");

export async function sendMail(toEmail:string, username: string, code: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: 'Emailcím ellenőrző kód - Küldöttek: Újjászületés FRPG',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body>
        <div style="width:100%; height:100%;">
            <img src="cid:bgnewland" alt="zoomed in photo of large grass with trees and sun in the background" width='100%' height='360px' style="object-fit:cover"/>
            <div style="text-align:center; font-size:30px; color:darkgoldenrod">Küldöttek: Újjászületés</div>
            <div style="text-align:center">
                <a href='http://localhost:3000/auth/action?mode=verifyEmail&user=${username}&actionCode=${code}' style="color:#252c36; font-size:18px; text-align:center; text-decoration:none;">
                    Az ellenőrző kódod
                </a>
            </div>
            <div style="color:crimson; text-align:center">
                A kód érvényessége 24 óra múlva lejár.
            </div>
        </div>
      </body>
    </html>`,
    attachments: [
        {
            file: 'newland.jpg',
            path: 'https://i.ibb.co/G2YSXLn/newland.jpg',
            cid: 'bgnewland'
        }
    ],
  };

  transporter.sendMail(mailOptions, function (error:any, info: any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}

export default async function SendEmailVerification(username: string, email: string) {
    
    const actionCode = nanoid();

    return (
        sendMail(email,username,actionCode)
    )
}