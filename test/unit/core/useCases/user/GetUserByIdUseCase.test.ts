import { describe, it, expect, beforeEach, vi } from "vitest";

import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";
import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "@/core/useCases/user/dto/GetUserByIdUseCaseDTO";
import { IUserUseCase } from "@/core/useCases/user/IUserUseCase";
import { UserUseCase } from "@/core/useCases/user/UserUseCase";
import { makeDoctor } from "@test/unit/factories/domain/MakeDoctor";
import { makeLocation } from "@test/unit/factories/domain/MakeLocation";
import { makeUser } from "@test/unit/factories/domain/MakeUser";

let userRepository: IUserRepository;
let doctorRepository: IDoctorRepository;
let locationRepository: ILocationRepository;
let sut: IUserUseCase;

describe("GetUserByIdUseCase", () => {
  beforeEach(() => {
    userRepository = {
      findById: vi.fn(),
    } as Partial<IUserRepository> as IUserRepository;

    doctorRepository = {
      findByUserId: vi.fn(),
    } as Partial<IDoctorRepository> as IDoctorRepository;

    locationRepository = {
      findByUserId: vi.fn(),
    } as Partial<ILocationRepository> as ILocationRepository;

    sut = new UserUseCase(userRepository, doctorRepository, locationRepository);
  });

  it("should return paginated users", async () => {
    const userMock = makeUser();
    const locationMock = makeLocation();
    const doctorMock = makeDoctor();

    const request: GetUserByIdUseCaseRequestDTO = {
      id: userMock.id.toString(),
    };

    const repositoryResponseMock = userMock;

    const response: GetUserByIdUseCaseResponseDTO = {
      user: userMock,
      doctorDetails: doctorMock,
      location: locationMock,
    };

    vi.mocked(userRepository.findById).mockResolvedValueOnce(
      repositoryResponseMock
    );

    vi.mocked(doctorRepository.findByUserId).mockResolvedValueOnce(doctorMock);

    vi.mocked(locationRepository.findByUserId).mockResolvedValueOnce(
      locationMock
    );

    const result = await sut.getUserById(request);

    expect(userRepository.findById).toHaveBeenCalledWith(
      userMock.id.toString()
    );
    expect(result).toEqual(response);
  });

  it("should throw an error when the informed id does not exist", async () => {
    const userMock = makeUser();

    const request: GetUserByIdUseCaseRequestDTO = {
      id: userMock.id.toString(),
    };

    vi.mocked(userRepository.findById).mockResolvedValueOnce(null);

    await expect(() => sut.getUserById(request)).rejects.toThrowError();
  });
});
