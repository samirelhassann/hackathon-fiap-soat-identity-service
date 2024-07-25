import { FastifyReply, FastifyRequest } from "fastify";
import { describe, expect, it, beforeEach, vi } from "vitest";

import { UserController } from "@/adapters/controllers/user/UserController";
import { GetCurrentUserPresenter } from "@/adapters/presenters/user/GetCurrentUserPresenter";
import { GetUserByIdPresenter } from "@/adapters/presenters/user/GetUserByIdPresenter";
import { GetUsersPresenter } from "@/adapters/presenters/user/GetUsersPresenter";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "@/core/useCases/user/dto/GetUserByIdUseCaseDTO";
import {
  GetUsersUseCaseRequestDTO,
  GetUsersUseCaseResponseDTO,
} from "@/core/useCases/user/dto/GetUsersUseCaseDTO";
import { IUserUseCase } from "@/core/useCases/user/IUserUseCase";
import { faker } from "@faker-js/faker";
import { makeDoctor } from "@test/unit/factories/domain/MakeDoctor";
import { makeLocation } from "@test/unit/factories/domain/MakeLocation";
import { makeUser } from "@test/unit/factories/domain/MakeUser";

let req: FastifyRequest;
let res: FastifyReply;
let controller: UserController;
let userUseCase: IUserUseCase;
let getUsersPresenter: GetUsersPresenter;
let getUserByIdPresenter: GetUserByIdPresenter;
let getCurrentUserPresenter: GetCurrentUserPresenter;

beforeEach(() => {
  userUseCase = {
    getUsers: vi.fn(),
    getUserById: vi.fn(),
    editUser: vi.fn(),
    checkByTaxvat: vi.fn(),
  };

  getUsersPresenter = {
    convertToViewModel: vi.fn(),
    convertToUseCaseDTO: vi.fn(),
    sendResponse: vi.fn(),
    convertErrorResponse: vi.fn(),
  };

  getUserByIdPresenter = {
    convertToViewModel: vi.fn(),
    convertToUseCaseDTO: vi.fn(),
    sendResponse: vi.fn(),
    convertErrorResponse: vi.fn(),
  };

  controller = new UserController(
    userUseCase,
    getUsersPresenter,
    getUserByIdPresenter,
    getCurrentUserPresenter
  );

  req = {} as FastifyRequest;
  res = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  } as unknown as FastifyReply;
});

describe("UserController", () => {
  describe("getUsers", () => {
    it("should call getUsers use case and send response", async () => {
      const useCaseRequest: GetUsersUseCaseRequestDTO = {
        params: new PaginationParams(faker.number.int(), faker.number.int()),
      };
      const mockedUser = makeUser();
      const useCaseResponse: GetUsersUseCaseResponseDTO = {
        paginationResponse: new PaginationResponse({
          currentPage: faker.number.int(),
          data: [mockedUser],
          pageSize: faker.number.int(),
          totalItems: faker.number.int(),
          totalPages: faker.number.int(),
        }),
      };

      vi.spyOn(getUsersPresenter, "convertToUseCaseDTO").mockReturnValueOnce(
        useCaseRequest
      );
      vi.spyOn(userUseCase, "getUsers").mockResolvedValueOnce(useCaseResponse);

      await controller.getUsers(req, res);

      expect(userUseCase.getUsers).toHaveBeenCalled();
      expect(getUsersPresenter.sendResponse).toHaveBeenCalledWith(
        res,
        useCaseResponse
      );
    });

    it("should handle errors and send error response", async () => {
      const error = new Error();
      vi.spyOn(userUseCase, "getUsers").mockRejectedValueOnce(error);

      await controller.getUsers(req, res);

      expect(getUsersPresenter.convertErrorResponse).toHaveBeenCalledWith(
        error,
        res
      );
    });
  });

  describe("getUserById", () => {
    it("should call getUserById use case and send response", async () => {
      const useCaseRequest: GetUserByIdUseCaseRequestDTO = {
        id: faker.string.numeric(),
      };
      const useCaseResponse: GetUserByIdUseCaseResponseDTO = {
        user: makeUser(),
        doctorDetails: makeDoctor(),
        location: makeLocation(),
      };

      vi.spyOn(getUserByIdPresenter, "convertToUseCaseDTO").mockReturnValueOnce(
        useCaseRequest
      );
      vi.spyOn(userUseCase, "getUserById").mockResolvedValueOnce(
        useCaseResponse
      );

      await controller.getUserById(req, res);

      expect(userUseCase.getUserById).toHaveBeenCalled();
      expect(getUserByIdPresenter.sendResponse).toHaveBeenCalledWith(
        res,
        useCaseResponse
      );
    });

    it("should handle errors and send error response", async () => {
      const error = new Error();
      vi.spyOn(userUseCase, "getUserById").mockRejectedValueOnce(error);

      await controller.getUserById(req, res);

      expect(getUserByIdPresenter.convertErrorResponse).toHaveBeenCalledWith(
        error,
        res
      );
    });
  });
});
