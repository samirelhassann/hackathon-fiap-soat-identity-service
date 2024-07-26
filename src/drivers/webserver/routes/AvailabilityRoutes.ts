import { FastifyInstance } from "fastify";

import { AvailabilityController } from "@/adapters/controllers/availability/AvailabilityController";
import { createAvailabilityDocSchema } from "@/adapters/controllers/availability/schemas/CreateAvailabilitySchema";
import { deleteAvailabilityDocSchema } from "@/adapters/controllers/availability/schemas/DeleteAvailabilitySchema";
import { listAvailabilityDocSchema } from "@/adapters/controllers/availability/schemas/ListAvailabilitySchema";
import { updateAvailabilityDocSchema } from "@/adapters/controllers/availability/schemas/UpdateAvailabilitySchema";
import verifyJwt from "@/adapters/middlewares/verifyJwt";
import { CreateAvailabilityPresenter } from "@/adapters/presenters/availability/CreateAvailabilityPresenter";
import { DeleteAvailabilityPresenter } from "@/adapters/presenters/availability/DeleteAvailabilityPresenter";
import { ListAvailabilitiesPresenter } from "@/adapters/presenters/availability/ListAvailabilitiesPresenter";
import { UpdateAvailabilityPresenter } from "@/adapters/presenters/availability/UpdateAvailabilityPresenter";
import {
  makeDoctorAvailabilityRepository,
  makeDoctorRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { RoleEnum } from "@/core/domain/enums/RoleEnum";
import { DoctorAvailabilityUseCase } from "@/core/useCases/availability/DoctorAvailabilityUseCase";

export async function AvailabilityRoutes(app: FastifyInstance) {
  const availabilityController = new AvailabilityController(
    new DoctorAvailabilityUseCase(
      makeDoctorRepository(),
      makeDoctorAvailabilityRepository()
    ),

    new CreateAvailabilityPresenter(),
    new ListAvailabilitiesPresenter(),
    new UpdateAvailabilityPresenter(),
    new DeleteAvailabilityPresenter()
  );

  app.addHook("preHandler", verifyJwt());

  app.post("", {
    schema: createAvailabilityDocSchema,
    handler: availabilityController.createAvailability.bind(
      availabilityController
    ),
    preHandler: [verifyJwt([RoleEnum.DOCTOR])],
  });

  app.get("", {
    schema: listAvailabilityDocSchema,
    handler: availabilityController.listAvailabilities.bind(
      availabilityController
    ),
    preHandler: [verifyJwt([RoleEnum.DOCTOR])],
  });

  app.put("/:availabilityId", {
    schema: updateAvailabilityDocSchema,
    handler: availabilityController.updateAvailability.bind(
      availabilityController
    ),
    preHandler: [verifyJwt([RoleEnum.DOCTOR])],
  });

  app.delete("/:availabilityId", {
    schema: deleteAvailabilityDocSchema,
    handler: availabilityController.deleteAvailability.bind(
      availabilityController
    ),
    preHandler: [verifyJwt([RoleEnum.DOCTOR])],
  });
}
