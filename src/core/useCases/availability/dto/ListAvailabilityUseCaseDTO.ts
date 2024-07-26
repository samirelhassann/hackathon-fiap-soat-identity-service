import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";

export interface ListAvailabilityUseCaseRequestDTO {
  userId: string;
}

export interface ListAvailabilityUseCaseResponseDTO {
  availabilities: DoctorAvailability[];
}
