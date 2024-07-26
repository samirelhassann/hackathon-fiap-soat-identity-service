import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  DeleteAvailabilityUseCaseRequestDTO,
  DeleteAvailabilityUseCaseResponseDTO,
} from "../dto/DeleteAvailabilityUseCaseDTO";

export class DeleteAvailabilityUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {}

  async execute(
    props: DeleteAvailabilityUseCaseRequestDTO
  ): Promise<DeleteAvailabilityUseCaseResponseDTO> {
    const { userId, availabilityId } = props;

    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const availability =
      await this.doctorAvailabilityRepository.findById(availabilityId);

    if (!availability) {
      throw new Error("Availability not found");
    }

    const isDoctorAvailability = availability.doctorId === doctor.id.toValue();

    if (!isDoctorAvailability) {
      throw new Error("Doctor does not own this availability");
    }

    await this.doctorAvailabilityRepository.delete(availabilityId);

    return {};
  }
}
