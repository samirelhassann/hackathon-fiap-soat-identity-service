import {
  CreateAvailabilityUseCaseRequestDTO,
  CreateAvailabilityUseCaseResponseDTO,
} from "./dto/CreateAvailabilityUseCaseDTO";
import {
  DeleteAvailabilityUseCaseRequestDTO,
  DeleteAvailabilityUseCaseResponseDTO,
} from "./dto/DeleteAvailabilityUseCaseDTO";
import {
  ListAvailabilityUseCaseRequestDTO,
  ListAvailabilityUseCaseResponseDTO,
} from "./dto/ListAvailabilityUseCaseDTO";
import {
  UpdateAvailabilityUseCaseRequestDTO,
  UpdateAvailabilityUseCaseResponseDTO,
} from "./dto/UpdateAvailabilityUseCaseDTO";

export interface IDoctorAvailabilityUseCase {
  listAvailabilities(
    props: ListAvailabilityUseCaseRequestDTO
  ): Promise<ListAvailabilityUseCaseResponseDTO>;

  createAvailability(
    props: CreateAvailabilityUseCaseRequestDTO
  ): Promise<CreateAvailabilityUseCaseResponseDTO>;

  updateAvailability(
    props: UpdateAvailabilityUseCaseRequestDTO
  ): Promise<UpdateAvailabilityUseCaseResponseDTO>;

  deleteAvailability(
    props: DeleteAvailabilityUseCaseRequestDTO
  ): Promise<DeleteAvailabilityUseCaseResponseDTO>;
}
