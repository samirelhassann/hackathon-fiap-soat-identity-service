/* eslint-disable @typescript-eslint/no-unused-vars */

import { FastifyReply, FastifyRequest } from "fastify";

import { ListAvailabilityViewModel } from "@/adapters/controllers/availability/viewModels/ListAvailabilityViewModel";
import {
  ListAvailabilityUseCaseRequestDTO,
  ListAvailabilityUseCaseResponseDTO,
} from "@/core/useCases/availability/dto/ListAvailabilityUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class ListAvailabilitiesPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      ListAvailabilityUseCaseRequestDTO,
      ListAvailabilityUseCaseResponseDTO,
      ListAvailabilityViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): ListAvailabilityUseCaseRequestDTO {
    const { userId } = req;

    return {
      userId: userId!,
    };
  }

  convertToViewModel({
    availabilities: useCaseResponse,
  }: ListAvailabilityUseCaseResponseDTO): ListAvailabilityViewModel {
    const availabilities = useCaseResponse.map((availability) => ({
      id: availability.id.toString(),
      dayOfWeek: availability.dayOfWeek,
      availableFrom: availability.availableFrom,
      availableTo: availability.availableTo,
    }));

    return {
      availabilities,
    };
  }

  async sendResponse(
    res: FastifyReply,
    response: ListAvailabilityUseCaseResponseDTO
  ) {
    const users = this.convertToViewModel(response);

    return res.status(200).send(users);
  }
}
