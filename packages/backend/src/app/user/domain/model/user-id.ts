import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class UserId extends Id {
  protected readonly name: string;

  public constructor(value: string) {
    super(value.trim());
    this.name = this.constructor.name;
  }

  static generate(): UserId {
    return new UserId(uuid());
  }

  public static from(id: string): UserId {
    return new UserId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
