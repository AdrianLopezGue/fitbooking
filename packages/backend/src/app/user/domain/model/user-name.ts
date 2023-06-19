import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserName extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): UserName {
    if (!name) {
      throw new Error('User name should not be empty');
    }

    return new UserName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
