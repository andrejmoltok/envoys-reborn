/**
 * @signUpAuthType - takes input from th eregistration process and adds a new user into the
 *                        Firebase Authentication module
 * @username - the desired username to register with
 * @email - the email address used to registered and later to authenticate into the system
 * @password - the password used to register and later to authenticate into the system
 */

export type signUpAuthType = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};
