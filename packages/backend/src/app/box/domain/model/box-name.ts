import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxNameCannotBeEmpty } from '../error/box-name-cannot-be-empty.error';
import { Result, err, ok } from 'neverthrow';

export class BoxName extends ValueObject<{ value: string }> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super(value);
    this.name = this.constructor.name;
  }

  public static from(name: string): Result<BoxName, BoxNameCannotBeEmpty> {
    return name
      ? ok(new BoxName({ value: name }))
      : err(BoxNameCannotBeEmpty.causeNameIsEmpty());
  }

  get value() {
    return this.props.value;
  }
}
