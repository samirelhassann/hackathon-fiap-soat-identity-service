import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";
import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  CreateAvailabilityUseCaseRequestDTO,
  CreateAvailabilityUseCaseResponseDTO,
} from "../dto/CreateAvailabilityUseCaseDTO";

export class CreateAvailabilityUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {}

  async execute(
    props: CreateAvailabilityUseCaseRequestDTO
  ): Promise<CreateAvailabilityUseCaseResponseDTO> {
    const { userId } = props;

    const doctor = await this.doctorRepository.findByUserId(userId);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const doctorAvailabilities =
      await this.doctorAvailabilityRepository.findManyByDoctorId(
        doctor.id.toValue()
      );

    const hasAvailabilityOnSameDay = doctorAvailabilities.some(
      (availability) => availability.dayOfWeek === props.dayOfWeek
    );

    if (hasAvailabilityOnSameDay) {
      throw new Error("Doctor already has availability on this day");
    }

    const availabilityToCreate = new DoctorAvailability({
      availableFrom: props.availableFrom,
      availableTo: props.availableUntil,
      dayOfWeek: props.dayOfWeek,
      doctorId: doctor.id.toValue(),
    });

    const availability =
      await this.doctorAvailabilityRepository.create(availabilityToCreate);

    return {
      availability,
    };
  }
}
