import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { ICoordinatesService } from "@/core/interfaces/services/ICoordinatesService";
import { IZipCodeDetailsService } from "@/core/interfaces/services/IZipcodeDetailsService";

import {
  GetDoctorAvailabilityUseCaseRequestDTO,
  GetDoctorAvailabilityUseCaseResponseDTO,
} from "./dto/GetDoctorAvailabilityUseCaseDTO";
import {
  GetDoctorUseCaseRequestDTO,
  GetDoctorUseCaseResponseDTO,
} from "./dto/GetDoctorUseCaseDTO copy";
import {
  GetDoctorsUseCaseRequestDTO,
  GetDoctorsUseCaseResponseDTO,
} from "./dto/GetUsersUseCaseDTO";
import { IDoctorUseCase } from "./IDoctorUseCase";
import { GetDoctorAvailabilityUseCase } from "./implementations/GetDoctorAvailabilityUseCase";
import { GetDoctorsUseCase } from "./implementations/GetDoctorsUseCase";
import { GetDoctorUseCase } from "./implementations/GetDoctorUseCase";

export class DoctorUseCase implements IDoctorUseCase {
  private getDoctorsUseCase: GetDoctorsUseCase;

  private getDoctorUseCase: GetDoctorUseCase;

  private getDoctorAvailabilityUseCase: GetDoctorAvailabilityUseCase;

  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository,
    private zipcodeDetailsService: IZipCodeDetailsService,
    private coordinatesService: ICoordinatesService
  ) {
    this.getDoctorsUseCase = new GetDoctorsUseCase(
      doctorRepository,
      zipcodeDetailsService,
      coordinatesService
    );

    this.getDoctorUseCase = new GetDoctorUseCase(doctorRepository);

    this.getDoctorAvailabilityUseCase = new GetDoctorAvailabilityUseCase(
      doctorRepository,
      doctorAvailabilityRepository
    );
  }

  async getDoctors(
    props: GetDoctorsUseCaseRequestDTO
  ): Promise<GetDoctorsUseCaseResponseDTO> {
    return this.getDoctorsUseCase.execute(props);
  }

  async getDoctor(
    props: GetDoctorUseCaseRequestDTO
  ): Promise<GetDoctorUseCaseResponseDTO> {
    return this.getDoctorUseCase.execute(props);
  }

  async getDoctorAvailability(
    props: GetDoctorAvailabilityUseCaseRequestDTO
  ): Promise<GetDoctorAvailabilityUseCaseResponseDTO> {
    return this.getDoctorAvailabilityUseCase.execute(props);
  }
}
