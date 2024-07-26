import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";

export interface UpdateAvailabilityUseCaseRequestDTO {
  userId: string;
  availabilityId: string;
  availableFrom: number;
  availableUntil: number;
}

export interface UpdateAvailabilityUseCaseResponseDTO {
  availability: DoctorAvailability;
}
