import { Location } from "@/core/domain/entities/Location";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";

export class InMemoryLocationRepository implements ILocationRepository {
  public items: Location[] = [];

  async findByUserId(userId: string): Promise<Location | null> {
    const answer = this.items.find((a) => a.userId.toString() === userId);

    return answer ?? null;
  }

  async create(location: Location): Promise<Location> {
    this.items.push(location);

    return location;
  }

  async update(location: Location): Promise<Location> {
    const index = this.items.findIndex((a) => a.id === location.id);

    this.items[index] = location;

    return location;
  }

  async delete(locationId: string): Promise<void> {
    this.items = this.items.filter((a) => a.id.toString() !== locationId);
  }

  async findById(id: string): Promise<Location | null> {
    const answer = this.items.find((a) => a.id.toString() === id);

    return answer ?? null;
  }
}
