import { Coordinates } from "@/core/domain/valueObjects/Coordinates";

import { GetCoordinatesResponse } from "../model/GetCoordinatesResponse";

export class GetCoordinatesResponseToValueObjectConverter {
  static convert(response: GetCoordinatesResponse[]): Coordinates[] {
    return response.map(
      (item) =>
        <Coordinates>{
          latitude: Number.parseFloat(item.lat),
          longitude: Number.parseFloat(item.lon),
        }
    );
  }
}
