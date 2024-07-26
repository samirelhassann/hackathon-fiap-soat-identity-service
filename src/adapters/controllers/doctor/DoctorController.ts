import { FastifyReply, FastifyRequest } from "fastify";

import { GetDoctorAvailabilityPresenter } from "@/adapters/presenters/doctor/GetDoctorAvailabilityPresenter";
import { GetDoctorPresenter } from "@/adapters/presenters/doctor/GetDoctorPresenter";
import { GetDoctorsPresenter } from "@/adapters/presenters/doctor/GetDoctorsPresenter";
import { IDoctorUseCase } from "@/core/useCases/doctor/IDoctorUseCase";

import {
  GetDoctorsViewModel,
  GetDoctorViewModel,
} from "./viewModels/GetDoctorsViewModel";

export class DoctorController {
  constructor(
    private doctorUseCase: IDoctorUseCase,

    private getDoctorsPresenter: GetDoctorsPresenter,
    private getDoctorPresenter: GetDoctorPresenter,
    private getDoctorAvailabilityPresenter: GetDoctorAvailabilityPresenter
  ) {}

  async getDoctors(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetDoctorsViewModel> {
    return this.doctorUseCase
      .getDoctors(this.getDoctorsPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getDoctorsPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getDoctorsPresenter.convertErrorResponse(error, res)
      );
  }

  async getDoctor(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetDoctorViewModel> {
    return this.doctorUseCase
      .getDoctor(this.getDoctorPresenter.convertToUseCaseDTO(req))
      .then((response) => this.getDoctorPresenter.sendResponse(res, response))
      .catch((error) =>
        this.getDoctorPresenter.convertErrorResponse(error, res)
      );
  }

  async getDoctorAvailability(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.doctorUseCase
      .getDoctorAvailability(
        this.getDoctorAvailabilityPresenter.convertToUseCaseDTO(req)
      )
      .then((response) =>
        this.getDoctorAvailabilityPresenter.sendResponse(res, response)
      )
      .catch((error) =>
        this.getDoctorAvailabilityPresenter.convertErrorResponse(error, res)
      );
  }
}
