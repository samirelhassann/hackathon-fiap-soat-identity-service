import { FastifyReply, FastifyRequest } from "fastify";

import { CreateAvailabilityPresenter } from "@/adapters/presenters/availability/CreateAvailabilityPresenter";
import { DeleteAvailabilityPresenter } from "@/adapters/presenters/availability/DeleteAvailabilityPresenter";
import { ListAvailabilitiesPresenter } from "@/adapters/presenters/availability/ListAvailabilitiesPresenter";
import { UpdateAvailabilityPresenter } from "@/adapters/presenters/availability/UpdateAvailabilityPresenter";
import { IDoctorAvailabilityUseCase } from "@/core/useCases/availability/IDoctorAvailabilityUseCase";

export class AvailabilityController {
  constructor(
    private doctorAvailabilityUseCase: IDoctorAvailabilityUseCase,

    private createAvailabilityPresenter: CreateAvailabilityPresenter,
    private listAvailabilitiesPresenter: ListAvailabilitiesPresenter,
    private updateAvailabilityPresenter: UpdateAvailabilityPresenter,
    private deleteAvailabilityPresenter: DeleteAvailabilityPresenter
  ) {}

  async createAvailability(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.doctorAvailabilityUseCase
      .createAvailability(
        this.createAvailabilityPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.createAvailabilityPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.createAvailabilityPresenter.convertErrorResponse(error, res)
      );
  }

  async listAvailabilities(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.doctorAvailabilityUseCase
      .listAvailabilities(
        this.listAvailabilitiesPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.listAvailabilitiesPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.listAvailabilitiesPresenter.convertErrorResponse(error, res)
      );
  }

  async updateAvailability(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.doctorAvailabilityUseCase
      .updateAvailability(
        this.updateAvailabilityPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.updateAvailabilityPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.updateAvailabilityPresenter.convertErrorResponse(error, res)
      );
  }

  async deleteAvailability(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.doctorAvailabilityUseCase
      .deleteAvailability(
        this.deleteAvailabilityPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.deleteAvailabilityPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.deleteAvailabilityPresenter.convertErrorResponse(error, res)
      );
  }
}
