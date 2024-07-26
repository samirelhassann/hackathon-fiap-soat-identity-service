import { Doctor } from "@/core/domain/entities/Doctor";

export interface GetDoctorUseCaseRequestDTO {
  id: string;
}

export interface GetDoctorUseCaseResponseDTO {
  doctor: Doctor;
}
