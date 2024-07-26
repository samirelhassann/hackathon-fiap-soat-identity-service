import { FastifyInstance } from "fastify";

import Swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { version } from "../../../../package.json";

const SWAGGER_PATH = "/docs-swagger";

export function swaggerConfig(app: FastifyInstance) {
  app.register(Swagger, {
    openapi: {
      info: {
        title: "Hackathon SOAT",
        description: "API Documentation for Hackathon soat service",
        version,
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: SWAGGER_PATH,
  });
}
