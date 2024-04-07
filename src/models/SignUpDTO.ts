import { SignInDTO, SignUpDTOT } from ".";

export class SignUpDTO extends SignInDTO {
  name: string;
  email: string;

  constructor({ name, email, username, password }: SignUpDTOT) {
    super({ username, password });
    this.name = name;
    this.email = email;
  }

  validate(): string[] {
    const errors = super.validate();
    const nameRegex = /^[a-zA-Z]{3,80}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;

    if (!nameRegex.test(this.name))
      errors.push(
        "Name must contain only letters and be between 3 and 80 characters long.\n"
      );

    if (!emailRegex.test(this.email))
      errors.push(
        "Email must contain only alphanumeric characters, '@', and '.'. Additionally, the domain after '.' must have at least 2 characters.\n"
      );

    return errors;
  }
}
