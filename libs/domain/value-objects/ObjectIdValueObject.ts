import ObjectID from 'bson-objectid';
import InvalidArgumentError from '../errors/InvalidArgumentError';
import IdValueObject from './IdValueObject';

export default class ObjectIdValueObject extends IdValueObject {
  public static random(): ObjectIdValueObject {
    return new ObjectIdValueObject(ObjectID.generate());
  }

  constructor(value: string) {
    super(value);
    this.checkUuidIsValid(value);
  }

  protected checkUuidIsValid(value: string): void {
    if (!ObjectID.isValid(value)) {
      throw new InvalidArgumentError(`Invalid ObjectId: ${value}`);
    }
  }
}
