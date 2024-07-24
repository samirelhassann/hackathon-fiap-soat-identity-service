import { Coordinates } from "@/core/domain/valueObjects/Coordinates";

export interface ICoordinatesService {
  getCoordinates(addressText: string): Promise<Coordinates[]>;
}
