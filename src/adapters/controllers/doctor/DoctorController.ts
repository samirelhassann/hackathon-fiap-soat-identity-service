import { FastifyReply, FastifyRequest } from "fastify";

import { GetCurrentUserPresenter } from "@/adapters/presenters/user/GetCurrentUserPresenter";
import { GetUserByIdPresenter } from "@/adapters/presenters/user/GetUserByIdPresenter";
import { GetUsersPresenter } from "@/adapters/presenters/user/GetUsersPresenter";
import { IUserUseCase } from "@/core/useCases/user/IUserUseCase";

import { GetDoctorsViewModel } from "./viewModels/GetDoctorsViewModel";

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
  ): Promise<GetDoctorsViewModel> {
    return this.userUseCase
      .getUsers(this.getUsersPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getUsersPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getUsersPresenter.convertErrorResponse(error, res)
      );
  }
}
