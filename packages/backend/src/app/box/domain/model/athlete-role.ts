import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';

export enum AthleteRolesEnum {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
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

  public static admin(): AthleteRole {
    return new AthleteRole({ value: AthleteRolesEnum[AthleteRolesEnum.ADMIN] });
  }

  get value(): AthleteRolesEnum {
    return this.props.value;
  }
}