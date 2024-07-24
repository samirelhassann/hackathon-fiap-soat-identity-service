import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { Location } from "@/core/domain/entities/Location";
import { User } from "@/core/domain/entities/User";
import { RoleEnum } from "@/core/domain/enums/RoleEnum";
import { Password } from "@/core/domain/valueObjects/Password";
import { Phone } from "@/core/domain/valueObjects/Phone";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { IUserRepository } from "@/core/interfaces/repositories/IUserRepository";
import { ICoordinatesService } from "@/core/interfaces/services/ICoordinatesService";
import { IZipCodeDetailsService } from "@/core/interfaces/services/IZipcodeDetailsService";

import {
  RegisterUseCaseRequestDTO,
  RegisterUseCaseResponseDTO,
} from "../dto/RegisterUseCaseDTO";

export class RegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private locationRepository: ILocationRepository,
    private zipcodeDetailsService: IZipCodeDetailsService,
    private coordinatesService: ICoordinatesService
  ) {}

  async execute(
    props: RegisterUseCaseRequestDTO
  ): Promise<RegisterUseCaseResponseDTO> {
    const { email, name, taxvat, password, role, phone, address } = props;

    const hasUserWithSameTaxVat =
      await this.userRepository.findByTaxVat(taxvat);

    if (hasUserWithSameTaxVat) {
      throw new AttributeConflictError<User>("taxVat", User.name);
    }

    const hasUserWithSameEmail = await this.userRepository.findByEmail(email);

    if (hasUserWithSameEmail) {
      throw new AttributeConflictError<User>("email", User.name);
    }

    const zipcodeDetails = await this.zipcodeDetailsService.getZipcodeDetails(
      address.zipcode.toString()
    );

    const validZipcode = !!zipcodeDetails.neighborhood;

    if (!validZipcode) {
      throw new Error("Invalid zipcode");
    }

    const formattedAddressToSearch = `${zipcodeDetails.street} ${zipcodeDetails.neighborhood}`;

    const coordinates = await this.coordinatesService.getCoordinates(
      formattedAddressToSearch
    );

    if (!coordinates.length) {
      throw new Error("Invalid address");
    }

    const userToCreate = new User({
      email,
      name,
      taxVat: new Taxvat({ number: taxvat }),
      passwordHash: new Password({ value: Password.valueToHash(password) }),
      isAdmin: role === RoleEnum.ADMIN,
      phone: new Phone({ number: phone }),
    });

    const createdUser = await this.userRepository.create(userToCreate);

    const { latitude, longitude } = coordinates[0];

    const locationToCreate = new Location({
      latitude,
      longitude,
      number: address.number,
      street: address.street,
      userId: createdUser.id.toValue(),
      zipCode: address.zipcode.toString(),
      observation: address.observation,
    });

    await this.locationRepository.create(locationToCreate);

    return {};
  }
}
