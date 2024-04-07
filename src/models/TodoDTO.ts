import { TodoPropsT } from ".";
export class TodoDTO {
  private timingRegex = /^\d+$/;
  private notifierInRegex = /^\d+$/;
  private titleRegex = /^.{3,}$/;

  title: TodoPropsT["title"];
  message: TodoPropsT["message"];
  status: TodoPropsT["status"];
  timing: TodoPropsT["timing"];
  notifierIn: TodoPropsT["notifierIn"];

  constructor({ message, timing, notifierIn, title, status }: TodoPropsT) {
    this.message = message;
    this.timing = timing;
    this.notifierIn = notifierIn;
    this.title = title;
    this.status = status;
  }

  validate(): string[] {
    const errors: string[] = [];

    if (!this.titleRegex.test(this.title)) {
      errors.push("Title must contain at least 3 characters");
    }

    if (!this.timingRegex.test(String(this.timing))) {
      errors.push("Timing must be a numeric value");
    }

    if (!this.notifierInRegex.test(String(this.notifierIn.selected))) {
      errors.push("Notifier must be a numeric value");
    }
    return errors;
  }
}
