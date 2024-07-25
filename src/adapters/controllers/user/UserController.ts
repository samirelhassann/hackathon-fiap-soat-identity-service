import { FastifyReply, FastifyRequest } from "fastify";

import { GetCurrentUserPresenter } from "@/adapters/presenters/user/GetCurrentUserPresenter";
import { GetUserByIdPresenter } from "@/adapters/presenters/user/GetUserByIdPresenter";
import { GetUsersPresenter } from "@/adapters/presenters/user/GetUsersPresenter";
import { IUserUseCase } from "@/core/useCases/user/IUserUseCase";

import { GetUserByIdViewModel } from "./viewModels/GetUserByIdViewModel";
import { GetUsersViewModel } from "./viewModels/GetUsersViewModel";

export class UserController {
  constructor(
    private userUseCase: IUserUseCase,

    private getUsersPresenter: GetUsersPresenter,
    private getUserByIdPresenter: GetUserByIdPresenter,
    private getCurrentUserPresenter: GetCurrentUserPresenter
  ) {}

  async getUsers(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetUsersViewModel> {
    return this.userUseCase
      .getUsers(this.getUsersPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getUsersPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getUsersPresenter.convertErrorResponse(error, res)
      );
  }

  async getCurrentUser(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetUserByIdViewModel> {
    return this.userUseCase
      .getUserById(this.getCurrentUserPresenter.convertToUseCaseDTO(req))
      .then((response) =>
        this.getCurrentUserPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getCurrentUserPresenter.convertErrorResponse(error, res)
      );
  }

  async getUserById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetUserByIdViewModel> {
    return this.userUseCase
      .getUserById(this.getUserByIdPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getUserByIdPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getUserByIdPresenter.convertErrorResponse(error, res)
      );
  }
}
