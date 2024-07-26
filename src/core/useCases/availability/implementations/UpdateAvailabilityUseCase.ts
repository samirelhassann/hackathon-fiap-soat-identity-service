import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  UpdateAvailabilityUseCaseRequestDTO,
  UpdateAvailabilityUseCaseResponseDTO,
} from "../dto/UpdateAvailabilityUseCaseDTO";

export class UpdateAvailabilityUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {}

  async execute(
    props: UpdateAvailabilityUseCaseRequestDTO
  ): Promise<UpdateAvailabilityUseCaseResponseDTO> {
    const { userId, availabilityId, availableFrom, availableUntil } = props;

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

    availability.availableFrom = availableFrom;
    availability.availableTo = availableUntil;

    const updatedAvailability =
      await this.doctorAvailabilityRepository.update(availability);

    return {
      availability: updatedAvailability,
    };
  }
}
