/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply, FastifyRequest } from "fastify";

import { deleteAvailabilityPathParamsSchema } from "@/adapters/controllers/availability/schemas/DeleteAvailabilitySchema";
import { RegisterUseCaseResponseDTO } from "@/core/useCases/auth/dto/RegisterUseCaseDTO";
import {
  DeleteAvailabilityUseCaseRequestDTO,
  DeleteAvailabilityUseCaseResponseDTO,
} from "@/core/useCases/availability/dto/DeleteAvailabilityUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class DeleteAvailabilityPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      DeleteAvailabilityUseCaseRequestDTO,
      DeleteAvailabilityUseCaseResponseDTO
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): DeleteAvailabilityUseCaseRequestDTO {
    const { userId } = req;

    const { availabilityId } = deleteAvailabilityPathParamsSchema.parse(
      req.params
    );

    return {
      userId: userId!,
      availabilityId,
    };
  }

  async sendResponse(
    res: FastifyReply,
    _useCaseResponseModel: RegisterUseCaseResponseDTO
  ) {
    return res.status(200).send({
      message: "Availability deleted successfully",
    });
  }
}
