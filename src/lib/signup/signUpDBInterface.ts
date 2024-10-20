/**
 * @signUpDBInterface - takes input from the Character creation
 *                      process and saves it into the database
 * @firstname - the first name of the fantasy character
 * @lastname - the last name of the fantasy character
 * @email - the email address used to register the character
 * @role - the automatically assigned role for the newly registered user of the character
 * @sex - the sex of the fantasy character
 * @money - the starting amount of money used in the game
 * @level - automatically set to level 1 for newly registered characters
 * @rank - the rank is calculated ased on the amount of the game posts the user made with
 *         the character
 * @strength @dexterity @constitution @intelligence @wisdom @charisma - character stats
 */

export interface signUpDBInterface {
  firstname: string;
  lastname: string;
  role: string;
  sex: string;
  race: string;
  serial: string;
  money: number;
  level: number;
  rank: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
