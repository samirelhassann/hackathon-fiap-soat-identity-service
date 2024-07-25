import { InvalidCredentialsError } from "@/core/domain/base/errors/useCases/InvalidCredentialsError";
import { User } from "@/core/domain/entities/User";
import { RoleEnum } from "@/core/domain/enums/RoleEnum";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";

import {
  AuthenticateUseCaseRequestDTO,
  AuthenticateUseCaseResponseDTO,
} from "../dto/AuthenticateUseCaseDTO";

export class AuthenticateUseCase {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute({
    login,
    password,
  }: AuthenticateUseCaseRequestDTO): Promise<AuthenticateUseCaseResponseDTO> {
    const user = await this.findUser(login);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const role = user.isAdmin ? RoleEnum.ADMIN : await this.getUserRole(user);

    return this.validatePasswordAndReturnRole(role, password, user);
  }

  private async findUser(crm: string): Promise<User | null> {
    const doctor = await this.doctorRepository.findByCRM(crm);

    if (doctor) {
      const user = await this.userRepository.findById(doctor.userId);
      if (user) {
        return user;
      }
    }

    return this.userRepository.findByEmailOrTaxvat(crm);
  }

  private async getUserRole(user: User): Promise<RoleEnum> {
    const isDoctor = await this.doctorRepository.findByUserId(
      user.id.toValue()
    );

    return isDoctor ? RoleEnum.DOCTOR : RoleEnum.PATIENT;
  }

  private validatePasswordAndReturnRole(
    role: RoleEnum,
    password: string,
    user: User
  ): AuthenticateUseCaseResponseDTO {
    const isPasswordValid = user.passwordHash.comparePassword(password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      role,
      userId: user.id.toValue(),
    };
  }
}
