import { FastifyReply, FastifyRequest } from "fastify";

import { getDoctorsQueryParamsSchema } from "@/adapters/controllers/doctor/schemas/GetDoctorsSchema";
import { GetDoctorsViewModel } from "@/adapters/controllers/doctor/viewModels/GetDoctorsViewModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import {
  GetDoctorsUseCaseRequestDTO,
  GetDoctorsUseCaseResponseDTO,
} from "@/core/useCases/doctor/dto/GetUsersUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetDoctorsPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetDoctorsUseCaseRequestDTO,
      GetDoctorsUseCaseResponseDTO,
      GetDoctorsViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetDoctorsUseCaseRequestDTO {
    const { page, pageSize, distance, rating, specialty, zipcode } =
      getDoctorsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    const searchParams = {
      distance,
      rating,
      specialty,
      zipCode: zipcode,
    };

    return {
      params,
      searchParams,
    };
  }

  convertToViewModel(model: GetDoctorsUseCaseResponseDTO): GetDoctorsViewModel {
    const doctors = model.paginationResponse.toResponse((item) => ({
      id: item.id.toString(),
      name: item.user?.name,
      crm: item.crm,
      specialty: item.specialty,
      averageRating: item.averageRating,
      address: {
        zipcode: item.location?.zipCode,
        street: item.location?.street,
        number: item.location?.number,
      },
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }));

    return doctors;
  }

  async sendResponse(
    res: FastifyReply,
    response: GetDoctorsUseCaseResponseDTO
  ) {
    const doctors = this.convertToViewModel(response);

    return res.status(200).send(doctors);
  }
}
