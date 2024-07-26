import { FastifyReply, FastifyRequest } from "fastify";

import {
  getDoctorAvailabilityPathParamsSchema,
  getDoctorAvailabilityQuerySchema,
} from "@/adapters/controllers/doctor/schemas/GetDoctorAvailabilitySchema";
import { GetDoctorAvailabilityViewModel } from "@/adapters/controllers/doctor/viewModels/GetDoctorAvailabilityViewModel";
import {
  GetDoctorAvailabilityUseCaseRequestDTO,
  GetDoctorAvailabilityUseCaseResponseDTO,
} from "@/core/useCases/doctor/dto/GetDoctorAvailabilityUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetDoctorAvailabilityPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetDoctorAvailabilityUseCaseRequestDTO,
      GetDoctorAvailabilityUseCaseResponseDTO,
      GetDoctorAvailabilityViewModel
    >
{
  convertToUseCaseDTO(
    req: FastifyRequest
  ): GetDoctorAvailabilityUseCaseRequestDTO {
    const { doctorId } = getDoctorAvailabilityPathParamsSchema.parse(
      req.params
    );

    const { endDate, startDate } = getDoctorAvailabilityQuerySchema.parse(
      req.query
    );

    return {
      doctorId,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
    };
  }

  convertToViewModel(
    useCaseResponse: GetDoctorAvailabilityUseCaseResponseDTO
  ): GetDoctorAvailabilityViewModel {
    return useCaseResponse as GetDoctorAvailabilityViewModel;
  }

  async sendResponse(
    res: FastifyReply,
    response: GetDoctorAvailabilityUseCaseResponseDTO
  ) {
    const doctor = this.convertToViewModel(response);

    return res.status(200).send(doctor);
  }
}
