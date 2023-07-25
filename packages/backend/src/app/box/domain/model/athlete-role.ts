import { ValueObject } from '@aulasoftwarelibre/nestjs-eventstore';
import { AthleteRoleNotValidError } from '../error/athlete-role-not-valid.error';
import { Result, err, ok } from 'neverthrow';

export enum AthleteRolesEnum {
  ADMIN = 'ADMIN',
  BASIC = 'BASIC',
}

export class AthleteRole extends ValueObject<{
  value: AthleteRolesEnum;
}> {
  protected readonly name: string;

  public constructor(value: { value: string }) {
    super({ value: AthleteRolesEnum[value.value] });
    this.name = this.constructor.name;
  }

  public static from(role: string): Result<AthleteRole, AthleteRoleNotValidError> {
    return role in AthleteRolesEnum
      ? ok(
          new AthleteRole({
            value: AthleteRolesEnum[role],
          }),
        )
      : err(AthleteRoleNotValidError.withRole(role));
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
