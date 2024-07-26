import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

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
import { IDoctorAvailabilityUseCase } from "./IDoctorAvailabilityUseCase";
import { CreateAvailabilityUseCase } from "./implementations/CreateAvailabilityUseCase";
import { DeleteAvailabilityUseCase } from "./implementations/DeleteAvailabilityUseCase";
import { ListAvailabilityUseCase } from "./implementations/ListAvailabilityUseCase";
import { UpdateAvailabilityUseCase } from "./implementations/UpdateAvailabilityUseCase";

export class DoctorAvailabilityUseCase implements IDoctorAvailabilityUseCase {
  private createAvailabilityUseCase: CreateAvailabilityUseCase;

  private updateAvailabilityUseCase: UpdateAvailabilityUseCase;

  private deleteAvailabilityUseCase: DeleteAvailabilityUseCase;

  private listAvailabilityUseCase: ListAvailabilityUseCase;

  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {
    this.createAvailabilityUseCase = new CreateAvailabilityUseCase(
      doctorRepository,
      doctorAvailabilityRepository
    );

    this.updateAvailabilityUseCase = new UpdateAvailabilityUseCase(
      doctorRepository,
      doctorAvailabilityRepository
    );

    this.deleteAvailabilityUseCase = new DeleteAvailabilityUseCase(
      doctorRepository,
      doctorAvailabilityRepository
    );

    this.listAvailabilityUseCase = new ListAvailabilityUseCase(
      doctorRepository,
      doctorAvailabilityRepository
    );
  }

  async listAvailabilities(
    props: ListAvailabilityUseCaseRequestDTO
  ): Promise<ListAvailabilityUseCaseResponseDTO> {
    return this.listAvailabilityUseCase.execute(props);
  }

  async updateAvailability(
    props: UpdateAvailabilityUseCaseRequestDTO
  ): Promise<UpdateAvailabilityUseCaseResponseDTO> {
    return this.updateAvailabilityUseCase.execute(props);
  }

  async deleteAvailability(
    props: DeleteAvailabilityUseCaseRequestDTO
  ): Promise<DeleteAvailabilityUseCaseResponseDTO> {
    return this.deleteAvailabilityUseCase.execute(props);
  }

  async createAvailability(
    props: CreateAvailabilityUseCaseRequestDTO
  ): Promise<CreateAvailabilityUseCaseResponseDTO> {
    return this.createAvailabilityUseCase.execute(props);
  }
}
