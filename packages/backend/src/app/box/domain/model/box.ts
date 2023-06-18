import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { BoxId } from './box-id';
import { BoxName } from './box-name';
import { BoxWasCreatedEvent } from '../event/box-was-created.event';

export class Box extends AggregateRoot {
  private _id!: BoxId;
  private _name!: BoxName;

  constructor(id?: BoxId, name?: BoxName) {
    super();
    this._id = id;
    this._name = name;
  }

  public static add(name: BoxName): Box {
    const box = new Box();

    const event = new BoxWasCreatedEvent(BoxId.generate().value, name.value);

    box.apply(event);
    return box;
  }

  private onBoxWasCreatedEvent(event: BoxWasCreatedEvent): void {
    this._id = BoxId.from(event.id);
    this._name = BoxName.from(event.name);
  }

  aggregateId(): string {
    return this._id.value;
  }

  get id(): BoxId {
    return this._id;
  }

  get name(): BoxName {
    return this._name;
  }
}
