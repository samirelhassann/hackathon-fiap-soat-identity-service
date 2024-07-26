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

export interface IDoctorUseCase {
  getDoctors(
    props: GetDoctorsUseCaseRequestDTO
  ): Promise<GetDoctorsUseCaseResponseDTO>;

  getDoctor(
    props: GetDoctorUseCaseRequestDTO
  ): Promise<GetDoctorUseCaseResponseDTO>;

  getDoctorAvailability(
    props: GetDoctorAvailabilityUseCaseRequestDTO
  ): Promise<GetDoctorAvailabilityUseCaseResponseDTO>;
}
