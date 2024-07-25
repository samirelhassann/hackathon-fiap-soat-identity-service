import { ResourceNotFoundError } from "@/core/domain/base/errors/useCases/ResourceNotFoundError";
import { User } from "@/core/domain/entities/User";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";

import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "../dto/GetUserByIdUseCaseDTO";

export class GetUserByIdUseCase {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private locationRepository: ILocationRepository
  ) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequestDTO): Promise<GetUserByIdUseCaseResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError(User.name);
    }

    const doctorDetails = await this.doctorRepository.findByUserId(
      user.id.toValue()
    );

    const location = await this.locationRepository.findByUserId(
      user.id.toValue()
    );

    return {
      user,
      doctorDetails,
      location,
    };
  }
}
