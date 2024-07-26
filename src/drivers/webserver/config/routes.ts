import { FastifyInstance } from "fastify";

import identifyRequest from "@/adapters/middlewares/identifyRequest";

import { AuthRoutes } from "../routes/AuthRoutes";
import { AvailabilityRoutes } from "../routes/AvailabilityRoutes";
import { DoctorRoutes } from "../routes/DoctorRoutes";
import { UserRoutes } from "../routes/UserRoutes";

const SERVICE_PREFIX = "/identity-service";

export function routes(app: FastifyInstance) {
  app.addHook("preHandler", identifyRequest);

  app.register(AuthRoutes, { prefix: `${SERVICE_PREFIX}` });
  app.register(UserRoutes, { prefix: `${SERVICE_PREFIX}/users` });
  app.register(DoctorRoutes, { prefix: `${SERVICE_PREFIX}/doctors` });
  app.register(AvailabilityRoutes, {
    prefix: `${SERVICE_PREFIX}/availability`,
  });
}
