/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply, FastifyRequest } from "fastify";

import { createAvailabilityPayloadSchema } from "@/adapters/controllers/availability/schemas/CreateAvailabilitySchema";
import { RegisterUseCaseResponseDTO } from "@/core/useCases/auth/dto/RegisterUseCaseDTO";
import {
  CreateAvailabilityUseCaseRequestDTO,
  CreateAvailabilityUseCaseResponseDTO,
} from "@/core/useCases/availability/dto/CreateAvailabilityUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class CreateAvailabilityPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      CreateAvailabilityUseCaseRequestDTO,
      CreateAvailabilityUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): CreateAvailabilityUseCaseRequestDTO {
    const { userId } = req;

    const { availableFrom, availableUntil, dayOfWeek } =
      createAvailabilityPayloadSchema.parse(req.body);

    return {
      userId: userId!,
      availableFrom,
      availableUntil,
      dayOfWeek,
    };
  }

  async sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: RegisterUseCaseResponseDTO
  ) {
    return res.status(201).send();
  }
}
