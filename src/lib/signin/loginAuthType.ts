/**
 * @signUpAuthType - takes input from th eregistration process and adds a new user into the
 *                        Firebase Authentication module
 * @username - the desired username to register with
 * @password - the password used to register and later to authenticate into the system
 */

export type loginAuthType = {
  username: string;
  password: string;
  confirm: string;
};
