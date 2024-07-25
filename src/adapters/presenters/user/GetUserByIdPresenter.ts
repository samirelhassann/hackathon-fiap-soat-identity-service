import { FastifyReply, FastifyRequest } from "fastify";

import { getUserByIdQueryParamsSchema } from "@/adapters/controllers/user/schemas/GetUserByIdSchema";
import { GetUserByIdViewModel } from "@/adapters/controllers/user/viewModels/GetUserByIdViewModel";
import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "@/core/useCases/user/dto/GetUserByIdUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetUserByIdPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetUserByIdUseCaseRequestDTO,
      GetUserByIdUseCaseResponseDTO,
      GetUserByIdViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetUserByIdUseCaseRequestDTO {
    const { id } = getUserByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertToViewModel(
    model: GetUserByIdUseCaseResponseDTO
  ): GetUserByIdViewModel {
    const response = <GetUserByIdViewModel>{
      id: model.user.id.toValue(),
      isDoctor: model.user.isDoctor,
      doctorId: model.doctorDetails?.id.toValue(),
      name: model.user.name,
      email: model.user.email,
      taxvat: model.user.taxVat.number,
      phone: model.user.phone.number,
      address: {
        zipcode: model.location?.zipCode,
        street: model.location?.street,
        number: model.location?.number,
        observation: model.location?.observation,
      },
    };

    return response;
  }

  async sendResponse(
    res: FastifyReply,
    useCaseResponseModel: GetUserByIdUseCaseResponseDTO
  ) {
    const user = this.convertToViewModel(useCaseResponseModel);

    return res.status(200).send(user);
  }
}
