import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class BoxId extends Id {
  static generate(): BoxId {
    return new BoxId(uuid());
  }

  public static from(id: string): BoxId {
    return new BoxId(id);
  }

  get value(): string {
    return this.props.value;
  }
}