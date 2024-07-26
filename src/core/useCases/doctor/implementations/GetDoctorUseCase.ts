import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  GetDoctorUseCaseRequestDTO,
  GetDoctorUseCaseResponseDTO,
} from "../dto/GetDoctorUseCaseDTO copy";

export class GetDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute({
    id,
  }: GetDoctorUseCaseRequestDTO): Promise<GetDoctorUseCaseResponseDTO> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return {
      doctor,
    };
  }
}
