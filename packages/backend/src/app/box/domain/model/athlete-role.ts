import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { AthleteRoleNotValidError } from '../error/athlete-role-not-valid.error';

export enum AthleteRolesEnum {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}

export class AthleteRole extends ValueObject<{
  value: AthleteRolesEnum;
}> {
  public static from(role: string): AthleteRole {
    if (role in AthleteRolesEnum === false) {
      throw AthleteRoleNotValidError.withRole(role);
    }

    return new AthleteRole({
      value: AthleteRolesEnum[role],
    });
  }

  public static admin(): AthleteRole {
    return new AthleteRole({ value: AthleteRolesEnum[AthleteRolesEnum.ADMIN] });
  }

  public static basic(): AthleteRole {
    return new AthleteRole({ value: AthleteRolesEnum[AthleteRolesEnum.BASIC] });
  }

  get value(): AthleteRolesEnum {
    return this.props.value;
  }
}
