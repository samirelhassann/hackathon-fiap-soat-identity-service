/* eslint-disable @typescript-eslint/naming-convention */
import { Coordinates } from "@/core/domain/valueObjects/Coordinates";
import { ICoordinatesService } from "@/core/interfaces/services/ICoordinatesService";

import api from "./api";
import { GetCoordinatesResponseToValueObjectConverter } from "./converters/GetCoordinatesResponseToValueObjectConverter";
import { GetCoordinatesResponse } from "./model/GetCoordinatesResponse";

export class OpenStreetMapService implements ICoordinatesService {
  async getCoordinates(addressText: string): Promise<Coordinates[]> {
    const ENDPOINT = "/search";

    const { data } = await api.get<GetCoordinatesResponse[]>(ENDPOINT, {
      params: {
        q: addressText,
        format: "json",
      },
    });

    return GetCoordinatesResponseToValueObjectConverter.convert(data);
  }
}
