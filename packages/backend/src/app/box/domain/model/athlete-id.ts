import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class AthleteId extends Id {
  protected readonly name: string;

  public constructor(value: string) {
    super(value.trim());
    this.name = this.constructor.name;
  }

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
