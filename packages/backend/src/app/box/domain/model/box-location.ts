import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxLocationCannotBeEmpty } from '../error/box-location-cannot-be-empty.error';
import { Result, ok, err } from 'neverthrow';

export class BoxLocation extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): Result<BoxLocation, BoxLocationCannotBeEmpty> {
    return name
      ? ok(new BoxLocation({ value: name }))
      : err(BoxLocationCannotBeEmpty.causeNameIsEmpty());
  }

  get value() {
    return this.props.value;
  }
}
