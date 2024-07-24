import { ZipCodeDetails } from "@/core/domain/valueObjects/ZipCodeDetails";

import { GetZipcodeDetailsResponse } from "../model/GetZipcodeDetailsResponse";

export class GetZipcodeDetailsResponseToValueObjectConverter {
  static convert(response: GetZipcodeDetailsResponse): ZipCodeDetails {
    return <ZipCodeDetails>{
      street: response.logradouro,
      neighborhood: response.bairro,
      city: response.localidade,
      state: response.uf,
    };
  }
}
