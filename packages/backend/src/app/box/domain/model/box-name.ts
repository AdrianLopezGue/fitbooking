import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxNameCannotBeEmpty } from '../error/box-name-cannot-be-empty.error';

export class BoxName extends ValueObject<{ value: string }> {
  public static from(name: string): BoxName {
    if (!name) {
      throw BoxNameCannotBeEmpty.causeNameIsEmpty();
    }

    return new BoxName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
