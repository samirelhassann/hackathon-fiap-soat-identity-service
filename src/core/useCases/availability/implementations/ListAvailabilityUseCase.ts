import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  ListAvailabilityUseCaseRequestDTO,
  ListAvailabilityUseCaseResponseDTO,
} from "../dto/ListAvailabilityUseCaseDTO";

export class ListAvailabilityUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {}

  async execute(
    props: ListAvailabilityUseCaseRequestDTO
  ): Promise<ListAvailabilityUseCaseResponseDTO> {
    const { userId } = props;

    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const availabilities =
      await this.doctorAvailabilityRepository.findManyByDoctorId(
        doctor.id.toValue()
      );

    return {
      availabilities,
    };
  }
}
