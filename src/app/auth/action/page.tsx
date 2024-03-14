/**
 * @Action - uses NextJs searchParams to read URL for action mode, usernam and actioncode
 * @redirect - redirects user to the main page when code is already used or invalid/no action mode is defined
 * @VerifyEmail - verify the email address by using the provided code from the email
 * @ResetPassword - reset the old password with a new one + ZOD validation
 */

import React from "react";
import { redirect } from "next/navigation";

import styles from "@/styles/Layout.module.css";
import fill from "@/styles/Fill.module.css";

function VerifyEmail(username: string, code: string) {
  //TODO check code for validity from db
  //TODO set emailVerified field in db to true
  //TODO display SUCCESS on screen
}

function ResetPassword(username: string, code: string) {
  //TODO check code for validity from db
  //TODO reset password and allow user to set new password
  //TODO display SUCCESS on screen
}

const Action = ({
  searchParams,
}: {
  searchParams: { mode: string; user: string; actionCode: string };
}) => {
  switch (searchParams.mode) {
    case "verifyEmail":
      VerifyEmail(searchParams.user, searchParams.actionCode);
    case "passwordReset":
      ResetPassword(searchParams.user, searchParams.actionCode);
    default: {
      redirect("/");
    }
  }
};

export default Action;
