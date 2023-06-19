import { Box } from '../model/box';
import { BoxId } from '../model/box-id';

export interface BoxRepository {
  find(id: BoxId): Promise<Box | undefined>;
  save(box: Box): Promise<void>;
  delete(entity: Box): Promise<void>;
}
