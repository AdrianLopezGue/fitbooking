import { DomainError } from '@aulasoftwarelibre/nestjs-eventstore';

export class AthleteRoleNotValidError extends DomainError {
  public static withRole(role: string) {
    return new AthleteRoleNotValidError(`Role not valid: ${role}`);
  }
}
