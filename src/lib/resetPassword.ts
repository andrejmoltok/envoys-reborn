'use server'

import { db } from "@/firebase/config";
import { collection, doc, setDoc } from 'firebase/firestore';
import { nanoid } from "nanoid";

const resetPasswordRef = collection(db, "resetPassword");

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
        <div style="width:100%; height:100%; background-color:#252c36;">
            <img src="cid:bgnewland" alt="zoomed in photo of large grass with trees and sun in the background" width='100%' height='360px' style="object-fit:cover"/>
            <div style="margin:15px; font-size:30px; color:darkgoldenrod; text-align:center;">
                'Küldöttek: Újjászületés' FRPG
            <div>
            <div style="margin:15px; text-align:center">
                <a href='http://localhost:3000/auth/action?mode=resetPassword&user=${username}&actionCode=${code}' style="color:white; font-size:30px; text-align:center; text-decoration:none;">
                    Az ellenőrző kódod
                </a>
            </div>
            <div style="margin:15px; color:crimson; text-align:center; font-size:12px;">
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

export default async function ResetPassword(username: string, email: string) {
    
    const actionCode = nanoid();

    sendMail(email,username,actionCode)

    await setDoc(doc(resetPasswordRef, username), {
      code: actionCode,
      email: email,
      used: false
    })
}