import { FastifyReply, FastifyRequest } from "fastify";

import { GetUserByIdViewModel } from "@/adapters/controllers/user/viewModels/GetUserByIdViewModel";
import {
  GetUserByIdUseCaseRequestDTO,
  GetUserByIdUseCaseResponseDTO,
} from "@/core/useCases/user/dto/GetUserByIdUseCaseDTO";

import { ErrorHandlingPresenter } from "../base/ErrorHandlingPresenter";
import { IControllerPresenter } from "../base/IControllerPresenter";

export class GetCurrentUserPresenter
  extends ErrorHandlingPresenter
  implements
    IControllerPresenter<
      GetUserByIdUseCaseRequestDTO,
      GetUserByIdUseCaseResponseDTO,
      GetUserByIdViewModel
    >
{
  convertToUseCaseDTO(req: FastifyRequest): GetUserByIdUseCaseRequestDTO {
    const { userId } = req;

    return {
      id: userId!,
    };
  }

  convertToViewModel(
    model: GetUserByIdUseCaseResponseDTO
  ): GetUserByIdViewModel {
    const response = <GetUserByIdViewModel>{
      id: model.user.id.toValue(),
      doctorId: model.doctorDetails?.id.toValue(),
      name: model.user.name,
      email: model.user.email,
      isDoctor: model.user.isDoctor,
      taxvat: model.user.taxVat.number,
      phone: model.user.phone.number,
      address: {
        zipcode: model.location?.zipCode,
        street: model.location?.street,
        number: model.location?.number,
        observation: model.location?.observation,
        latitude: model.location?.latitude,
        longitude: model.location?.longitude,
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
