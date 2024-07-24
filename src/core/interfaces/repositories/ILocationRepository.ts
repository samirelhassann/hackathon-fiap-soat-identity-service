import { Location } from "@/core/domain/entities/Location";

export interface ILocationRepository {
  findByUserId(userId: string): Promise<Location | null>;

  create(location: Location): Promise<Location>;

  update(location: Location): Promise<Location>;

  delete(locationId: string): Promise<void>;
}
