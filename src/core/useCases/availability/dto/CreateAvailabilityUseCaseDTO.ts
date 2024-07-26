import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";

export interface CreateAvailabilityUseCaseRequestDTO {
  userId: string;
  dayOfWeek: number;
  availableFrom: number;
  availableUntil: number;
}

export interface CreateAvailabilityUseCaseResponseDTO {
  availability: DoctorAvailability;
}
