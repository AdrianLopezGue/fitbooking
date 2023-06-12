import ValueObject from './ValueObject';

export default class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value ? String(value).trim() : value);
  }
}
