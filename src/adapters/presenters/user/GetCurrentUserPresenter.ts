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
    console.log(`• [LOG] - userId`, userId);

    return {
      id: userId!,
    };
  }

  convertToViewModel(
    model: GetUserByIdUseCaseResponseDTO
  ): GetUserByIdViewModel {
    const response = <GetUserByIdViewModel>{
      id: model.user.id.toValue(),
      name: model.user.name,
      email: model.user.email,
      taxvat: model.user.taxVat.number,
      phone: model.user.phone.number,
      doctorDetails: {
        crm: model.doctorDetails?.crm,
        specialty: model.doctorDetails?.specialty,
      },
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
