import { FastifyInstance } from "fastify";

import { AuthController } from "@/adapters/controllers/auth/AuthController";
import { authenticateDocSchema } from "@/adapters/controllers/auth/schemas/AuthenticateSchema";
import { registerDocSchema } from "@/adapters/controllers/auth/schemas/RegisterSchema";
import { AuthenticatePresenter } from "@/adapters/presenters/auth/AuthenticatePresenter";
import { RegisterPresenter } from "@/adapters/presenters/auth/RegisterPresenter";
import {
  makeDoctorRepository,
  makeLocationRepository,
  makeUserRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { OpenStreetMapService } from "@/adapters/services/openStreetMap/OpenStreetMapService";
import { ViaCepService } from "@/adapters/services/viaCep/ViaCepService";
import { AuthUseCase } from "@/core/useCases/auth/AuthUseCase";

export async function AuthRoutes(app: FastifyInstance) {
  const authController = new AuthController(
    new AuthUseCase(
      makeUserRepository(),
      makeLocationRepository(),
      makeDoctorRepository(),
      new ViaCepService(),
      new OpenStreetMapService()
    ),

    new RegisterPresenter(),
    new AuthenticatePresenter()
  );

  app.post("/register", {
    schema: registerDocSchema,
    handler: authController.register.bind(authController),
  });

  app.post("/auth", {
    schema: authenticateDocSchema,
    handler: authController.authenticate.bind(authController),
  });
}
