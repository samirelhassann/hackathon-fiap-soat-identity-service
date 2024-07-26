/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply, FastifyRequest } from "fastify";

import {
  updateAvailabilityPathParamsSchema,
  updateAvailabilityPayloadSchema,
} from "@/adapters/controllers/availability/schemas/UpdateAvailabilitySchema";
import { RegisterUseCaseResponseDTO } from "@/core/useCases/auth/dto/RegisterUseCaseDTO";
import {
  UpdateAvailabilityUseCaseRequestDTO,
  UpdateAvailabilityUseCaseResponseDTO,
} from "@/core/useCases/availability/dto/UpdateAvailabilityUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class UpdateAvailabilityPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      UpdateAvailabilityUseCaseRequestDTO,
      UpdateAvailabilityUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): UpdateAvailabilityUseCaseRequestDTO {
    const { userId } = req;

    const { availableFrom, availableUntil } =
      updateAvailabilityPayloadSchema.parse(req.body);

    const { availabilityId } = updateAvailabilityPathParamsSchema.parse(
      req.params
    );

    return {
      userId: userId!,
      availabilityId,
      availableFrom,
      availableUntil,
    };
  }

  async sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: RegisterUseCaseResponseDTO
  ) {
    return res.status(200).send({
      message: "Availability updated successfully",
    });
  }
}
