import {
  IDoctorRepository,
  SearchDoctor,
} from "@/core/interfaces/repositories/IDoctorRepository";
import { ICoordinatesService } from "@/core/interfaces/services/ICoordinatesService";
import { IZipCodeDetailsService } from "@/core/interfaces/services/IZipcodeDetailsService";

import {
  GetDoctorsUseCaseRequestDTO,
  GetDoctorsUseCaseResponseDTO,
} from "../dto/GetUsersUseCaseDTO";

export class GetDoctorsUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private zipcodeDetailsService: IZipCodeDetailsService,
    private coordinatesService: ICoordinatesService
  ) {}

  async execute({
    params,
    searchParams,
  }: GetDoctorsUseCaseRequestDTO): Promise<GetDoctorsUseCaseResponseDTO> {
    const searchParamsRepository: SearchDoctor =
      await this.buildSearchParams(searchParams);

    const paginationResponse = await this.doctorRepository.findMany(
      params,
      searchParamsRepository
    );

    return {
      paginationResponse,
    };
  }

  private async buildSearchParams(
    searchParams: GetDoctorsUseCaseRequestDTO["searchParams"]
  ): Promise<SearchDoctor> {
    if (!searchParams) return {};

    const { zipCode, distance, rating, specialty } = searchParams;

    if (distance !== undefined && distance < 0) {
      throw new Error("Distance must be a positive number");
    }

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      throw new Error("Rating must be between 0 and 5");
    }

    const searchParamsRepository: SearchDoctor = {
      ...(distance !== undefined && { distance }),
      ...(specialty && { specialty }),
      ...(rating !== undefined && { rating }),
    };

    if (!zipCode) {
      return searchParamsRepository;
    }

    const coordinates = await this.validateZipcodeAndGetCoordinates(zipCode);

    return {
      ...searchParamsRepository,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };
  }

  private async validateZipcodeAndGetCoordinates(zipcode: string) {
    const zipcodeDetails =
      await this.zipcodeDetailsService.getZipcodeDetails(zipcode);

    if (!zipcodeDetails.neighborhood) {
      throw new Error("Invalid zipcode");
    }

    const formattedAddressToSearch = `${zipcodeDetails.street} ${zipcodeDetails.neighborhood}`;

    const coordinates = await this.coordinatesService.getCoordinates(
      formattedAddressToSearch
    );

    if (!coordinates.length) {
      throw new Error("Invalid address");
    }

    return coordinates[0];
  }
}
