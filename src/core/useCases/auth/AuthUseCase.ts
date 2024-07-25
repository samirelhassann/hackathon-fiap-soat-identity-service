/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";
import { ICoordinatesService } from "@/core/interfaces/services/ICoordinatesService";
import { IZipCodeDetailsService } from "@/core/interfaces/services/IZipcodeDetailsService";

import {
  AuthenticateUseCaseRequestDTO,
  AuthenticateUseCaseResponseDTO,
} from "./dto/AuthenticateUseCaseDTO";
import {
  RegisterUseCaseRequestDTO,
  RegisterUseCaseResponseDTO,
} from "./dto/RegisterUseCaseDTO";
import { IAuthUseCase } from "./IAuthUseCase";
import { AuthenticateUseCase } from "./implementations/AuthenticateUseCase";
import { RegisterUseCase } from "./implementations/RegisterUseCase";

export class AuthUseCase implements IAuthUseCase {
  private registerUseCase: RegisterUseCase;

  private authenticateUseCase: AuthenticateUseCase;

  constructor(
    private userRepository: IUserRepository,
    private locationRepository: ILocationRepository,
    private doctorRepository: IDoctorRepository,
    private zipcodeDetailsService: IZipCodeDetailsService,
    private coordinatesService: ICoordinatesService
  ) {
    this.registerUseCase = new RegisterUseCase(
      userRepository,
      locationRepository,
      doctorRepository,
      zipcodeDetailsService,
      coordinatesService
    );

    this.authenticateUseCase = new AuthenticateUseCase(
      userRepository,
      doctorRepository
    );
  }

  async register(
    props: RegisterUseCaseRequestDTO
  ): Promise<RegisterUseCaseResponseDTO> {
    return this.registerUseCase.execute(props);
  }

  async authenticate(
    props: AuthenticateUseCaseRequestDTO
  ): Promise<AuthenticateUseCaseResponseDTO> {
    return this.authenticateUseCase.execute(props);
  }
}
