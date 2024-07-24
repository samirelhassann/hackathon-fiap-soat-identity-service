/* eslint-disable @typescript-eslint/naming-convention */
import { ZipCodeDetails } from "@/core/domain/valueObjects/ZipCodeDetails";
import { IZipCodeDetailsService } from "@/core/interfaces/services/IZipcodeDetailsService";

import api from "./api";
import { GetZipcodeDetailsResponseToValueObjectConverter } from "./converters/GetZipcodeDetailsResponseToValueObjectConverter";
import { GetZipcodeDetailsResponse } from "./model/GetZipcodeDetailsResponse";

export class ViaCepService implements IZipCodeDetailsService {
  async getZipcodeDetails(zipcode: string): Promise<ZipCodeDetails> {
    const ENDPOINT = "/{zipCode}/json";

    const { data } = await api.get<GetZipcodeDetailsResponse>(
      ENDPOINT.replace("{zipCode}", zipcode)
    );

    return GetZipcodeDetailsResponseToValueObjectConverter.convert(data);
  }
}
