import { Athlete } from '../box/domain/model/athlete';
import { AthleteId } from '../box/domain/model/athlete-id';
import { AthleteRole, AthleteRolesEnum } from '../box/domain/model/athlete-role';
import { BoxId } from '../box/domain/model/box-id';
import { UserId } from '../user';
import { UserEmail } from '../user/domain/model/user-email';

export class AthleteBuilder {
  public id: string;
  public email: string;
  public userId: string | undefined;
  public role: string;
  public boxId: string;

  public constructor() {
    this.id = '0f6e8a59-7429-4930-9d38-3294552d2e40';
    this.email = 'email@email.com';
    this.role = AthleteRolesEnum.BASIC;
    this.boxId = '8513ed29-8a88-4c2a-8cc8-9bad4f303ad4';
  }

  build(): Athlete {
    return new Athlete(
      AthleteId.from(this.id),
      UserEmail.from(this.email),
      this.userId ? UserId.from(this.userId) : undefined,
      new AthleteRole({ value: this.role }),
      BoxId.from(this.boxId),
    );
  }

  withEmail(email: string) {
    this.email = email;
    return this;
  }

  withUserId(userId: string) {
    this.userId = userId;
    return this;
  }
}
