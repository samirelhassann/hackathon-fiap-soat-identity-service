import { FastifyInstance } from "fastify";

import { DoctorController } from "@/adapters/controllers/doctor/DoctorController";
import { getDoctorAvailabilityDocSchema } from "@/adapters/controllers/doctor/schemas/GetDoctorAvailabilitySchema";
import { getDoctorDocSchema } from "@/adapters/controllers/doctor/schemas/GetDoctorSchema";
import { getDoctorsDocSchema } from "@/adapters/controllers/doctor/schemas/GetDoctorsSchema";
import verifyJwt from "@/adapters/middlewares/verifyJwt";
import { GetDoctorAvailabilityPresenter } from "@/adapters/presenters/doctor/GetDoctorAvailabilityPresenter";
import { GetDoctorPresenter } from "@/adapters/presenters/doctor/GetDoctorPresenter";
import { GetDoctorsPresenter } from "@/adapters/presenters/doctor/GetDoctorsPresenter";
import {
  makeDoctorAvailabilityRepository,
  makeDoctorRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { OpenStreetMapService } from "@/adapters/services/openStreetMap/OpenStreetMapService";
import { ViaCepService } from "@/adapters/services/viaCep/ViaCepService";
import { DoctorUseCase } from "@/core/useCases/doctor/DoctorUseCase";

export async function DoctorRoutes(app: FastifyInstance) {
  const doctorController = new DoctorController(
    new DoctorUseCase(
      makeDoctorRepository(),
      makeDoctorAvailabilityRepository(),
      new ViaCepService(),
      new OpenStreetMapService()
    ),

    new GetDoctorsPresenter(),
    new GetDoctorPresenter(),
    new GetDoctorAvailabilityPresenter()
  );

  app.addHook("preHandler", verifyJwt());

  app.get("", {
    schema: getDoctorsDocSchema,
    handler: doctorController.getDoctors.bind(doctorController),
  });

  app.get("/:id", {
    schema: getDoctorDocSchema,
    handler: doctorController.getDoctor.bind(doctorController),
  });

  app.get("/:doctorId/availability", {
    schema: getDoctorAvailabilityDocSchema,
    handler: doctorController.getDoctorAvailability.bind(doctorController),
  });
}
