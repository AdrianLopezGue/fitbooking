import { Athlete } from '../box/domain/model/athlete';
import { Box } from '../box/domain/model/box';
import { BoxId } from '../box/domain/model/box-id';
import { BoxName } from '../box/domain/model/box-name';

export class BoxBuilder {
  public id: string;
  public name: string;
  public athletes: Athlete[];

  public constructor() {
    this.id = '0f6e8a59-7429-4930-9d38-3294552d2e40';
    this.name = 'Defaul name';
    this.athletes = [];
  }

  build(): Box {
    return new Box(BoxId.from(this.id), new BoxName({ value: this.name }), this.athletes);
  }

  withAthletes(athletes: Athlete[]): BoxBuilder {
    this.athletes = athletes;
    return this;
  }
}
