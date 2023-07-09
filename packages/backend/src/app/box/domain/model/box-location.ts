import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxLocationCannotBeEmpty } from '../error/box-location-cannot-be-empty.error';

export class BoxLocation extends ValueObject<{ value: string }> {
  public static from(name: string): BoxLocation {
    if (!name) {
      throw BoxLocationCannotBeEmpty.causeNameIsEmpty();
    }

    return new BoxLocation({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
