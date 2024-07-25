import { FastifyInstance } from "fastify";

import { getCurrentUserDocSchema } from "@/adapters/controllers/user/schemas/GetCurrentUserSchema";
import { getUserByIdDocSchema } from "@/adapters/controllers/user/schemas/GetUserByIdSchema";
import { getUsersDocSchema } from "@/adapters/controllers/user/schemas/GetUsersSchema";
import { UserController } from "@/adapters/controllers/user/UserController";
import verifyJwt from "@/adapters/middlewares/verifyJwt";
import { GetCurrentUserPresenter } from "@/adapters/presenters/user/GetCurrentUserPresenter";
import { GetUserByIdPresenter } from "@/adapters/presenters/user/GetUserByIdPresenter";
import { GetUsersPresenter } from "@/adapters/presenters/user/GetUsersPresenter";
import {
  makeDoctorRepository,
  makeLocationRepository,
  makeUserRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { RoleEnum } from "@/core/domain/enums/RoleEnum";
import { UserUseCase } from "@/core/useCases/user/UserUseCase";

export async function UserRoutes(app: FastifyInstance) {
  const userController = new UserController(
    new UserUseCase(
      makeUserRepository(),
      makeDoctorRepository(),
      makeLocationRepository()
    ),

    new GetUsersPresenter(),
    new GetUserByIdPresenter(),
    new GetCurrentUserPresenter()
  );

  app.addHook("preHandler", verifyJwt());

  app.get("", {
    schema: getUsersDocSchema,
    handler: userController.getUsers.bind(userController),
    preHandler: [verifyJwt([RoleEnum.ADMIN])],
  });

  app.get("/:id", {
    schema: getUserByIdDocSchema,
    handler: userController.getUserById.bind(userController),
    preHandler: [verifyJwt([RoleEnum.ADMIN])],
  });

  app.get("/me", {
    schema: getCurrentUserDocSchema,
    handler: userController.getCurrentUser.bind(userController),
  });
}
