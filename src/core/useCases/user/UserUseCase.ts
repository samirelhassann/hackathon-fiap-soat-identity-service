import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";

import {
  CheckUserByTaxvatUseCaseRequestDTO,
  CheckUserByTaxvatUseCaseResponseDTO,
} from "./dto/CheckUserByTaxvatUseCaseDTO";
import {
  EditUserUseCaseRequestDTO,
  EditUserUseCaseResponseDTO,
} from "./dto/EditUserUseCaseDTO";
import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "./dto/GetUserByIdUseCaseDTO";
import {
  GetUsersUseCaseRequestDTO,
  GetUsersUseCaseResponseDTO,
} from "./dto/GetUsersUseCaseDTO";
import { CheckByTaxvatUseCase } from "./implementations/CheckByTaxvatUseCase";
import { EditUserUseCase } from "./implementations/EditUserUseCase";
import { GetUserByIdUseCase } from "./implementations/GetUserByIdUseCase";
import { GetUsersUseCase } from "./implementations/GetUsersUseCase";
import { IUserUseCase } from "./IUserUseCase";

export class UserUseCase implements IUserUseCase {
  private getUsersUseCase: GetUsersUseCase;

  private checkUserByTaxvatUseCase: CheckByTaxvatUseCase;

  private getUserByIdUseCase: GetUserByIdUseCase;

  private editUserUseCase: EditUserUseCase;

  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private locationRepository: ILocationRepository
  ) {
    this.getUsersUseCase = new GetUsersUseCase(userRepository);
    this.checkUserByTaxvatUseCase = new CheckByTaxvatUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(
      userRepository,
      doctorRepository,
      locationRepository
    );
    this.editUserUseCase = new EditUserUseCase(userRepository);
  }

  async getUsers(
    props: GetUsersUseCaseRequestDTO
  ): Promise<GetUsersUseCaseResponseDTO> {
    return this.getUsersUseCase.execute(props);
  }

  async checkByTaxvat(
    props: CheckUserByTaxvatUseCaseRequestDTO
  ): Promise<CheckUserByTaxvatUseCaseResponseDTO> {
    return this.checkUserByTaxvatUseCase.execute(props);
  }

  async getUserById(
    props: GetUserByIdUseCaseRequestDTO
  ): Promise<GetUserByIdUseCaseResponseDTO> {
    return this.getUserByIdUseCase.execute(props);
  }

  async editUser(
    props: EditUserUseCaseRequestDTO
  ): Promise<EditUserUseCaseResponseDTO> {
    return this.editUserUseCase.execute(props);
  }
}
