import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class AthleteId extends Id {
  static generate(): AthleteId {
    return new AthleteId(uuid());
  }

  public static from(id: string): AthleteId {
    return new AthleteId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
