import { SignInDTOT } from ".";

export class SignInDTO {
  username: string;
  password: string;

  constructor({ username, password }: SignInDTOT) {
    this.username = username;
    this.password = password;
  }

  validate(): string[] {
    const usernameRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{3,15}$/;
    const passwordRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,30}$/;
    const errors: string[] = [];

    if (!usernameRegex.test(this.username))
    errors.push("Username must contain only alphanumeric characters and be between 3 and 15 characters long.\n");
  
  if (!passwordRegex.test(this.password))
    errors.push("Password must contain at least one letter, one number, and be between 8 and 30 characters long.\n");

    return errors;
  }
}
