import { FastifyReply, FastifyRequest } from "fastify";

import { getDoctorPathParamsSchema } from "@/adapters/controllers/doctor/schemas/GetDoctorSchema";
import { GetDoctorViewModel } from "@/adapters/controllers/doctor/viewModels/GetDoctorsViewModel";
import {
  GetDoctorUseCaseRequestDTO,
  GetDoctorUseCaseResponseDTO,
} from "@/core/useCases/doctor/dto/GetDoctorUseCaseDTO copy";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetDoctorPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetDoctorUseCaseRequestDTO,
      GetDoctorUseCaseResponseDTO,
      GetDoctorViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetDoctorUseCaseRequestDTO {
    const { id } = getDoctorPathParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel({
    doctor,
  }: GetDoctorUseCaseResponseDTO): GetDoctorViewModel {
    return {
      id: doctor.id.toString(),
      name: doctor.user?.name,
      crm: doctor.crm,
      specialty: doctor.specialty,
      averageRating: doctor.averageRating,
      address: {
        zipcode: doctor.location?.zipCode,
        street: doctor.location?.street,
        number: doctor.location?.number,
      },
    };
  }

  async sendResponse(res: FastifyReply, response: GetDoctorUseCaseResponseDTO) {
    const doctor = this.convertToViewModel(response);

    return res.status(200).send(doctor);
  }
}
