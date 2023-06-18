import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export class BoxName extends ValueObject<{ value: string }> {
  public static from(name: string): BoxName {
    if (!name) {
      throw new Error('Box name should not be empty');
    }

    return new BoxName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
