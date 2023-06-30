import { Box } from '../../domain/model/box';
import { BoxId } from '../../domain/model/box-id';
import { BoxRepository } from '../../domain/service/box.repository';

export class InMemoryBoxRepository implements BoxRepository {
  constructor(public boxes: Box[] = []) {}

  async find(id: BoxId): Promise<Box | undefined> {
    return this.boxes.find((box: Box) => box.id.equals(id));
  }

  async save(box: Box): Promise<void> {
    const boxFound = await this.find(box.id);

    if (boxFound) {
      this.boxes = this.boxes.filter(s => !s.id.equals(box.id));
    }

    this.boxes.push(box);
  }

  delete(entity: Box): Promise<void> {
    this.boxes = this.boxes.filter((box: Box) => !box.id.equals(entity.id));
    return Promise.resolve();
  }

  findAll(): Promise<Box[]> {
    return Promise.resolve(this.boxes);
  }
}
