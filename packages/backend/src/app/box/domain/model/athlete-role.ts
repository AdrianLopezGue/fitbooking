import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export enum AthleteRolesEnum {
  ADMIN = 'ADMIN',
  KITCHEN = 'KITCHEN',
}

export class AthleteRole extends ValueObject<{
  value: AthleteRolesEnum;
}> {
  public static from(role: string): AthleteRole {
    if (role in AthleteRolesEnum === false) {
      throw new Error('Athlete role is not valid');
    }

    return new AthleteRole({
      value: AthleteRolesEnum[role],
    });
  }

  get value(): AthleteRolesEnum {
    return this.props.value;
  }
}
