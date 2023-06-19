import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class Password extends ValueObject<{
  value: string;
}> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): Password {
    if (name.length < 8) {
      throw new Error('Password too short');
    }

    return new Password({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
