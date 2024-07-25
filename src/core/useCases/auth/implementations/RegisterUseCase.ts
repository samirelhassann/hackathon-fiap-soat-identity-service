import { AttributeConflictError } from "@/core/domain/base/errors/useCases/AttributeConflictError";
import { Doctor } from "@/core/domain/entities/Doctor";
import { Location } from "@/core/domain/entities/Location";
import { User } from "@/core/domain/entities/User";
import { RoleEnum } from "@/core/domain/enums/RoleEnum";
import { Coordinates } from "@/core/domain/valueObjects/Coordinates";
import { Password } from "@/core/domain/valueObjects/Password";
import { Phone } from "@/core/domain/valueObjects/Phone";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
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
    private doctorRepository: IDoctorRepository,
    private zipcodeDetailsService: IZipCodeDetailsService,
    private coordinatesService: ICoordinatesService
  ) {}

  async execute(
    props: RegisterUseCaseRequestDTO
  ): Promise<RegisterUseCaseResponseDTO> {
    const {
      email,
      name,
      taxvat,
      password,
      role,
      phone,
      address,
      doctorDetails,
    } = props;

    await this.validateData(taxvat, email, doctorDetails?.crm);

    const coordinates = await this.validateZipcodeAndGetCoordinates(address);

    const createdUser = await this.createUser(
      email,
      name,
      taxvat,
      password,
      role,
      phone
    );

    const isDoctor = role === RoleEnum.DOCTOR;

    if (isDoctor) {
      await this.createDoctor(doctorDetails!, createdUser);
    }

    await this.createLocation(coordinates, address, createdUser);

    return {};
  }

  private async validateData(taxvat: string, email: string, crm?: number) {
    const hasUserWithSameTaxVat =
      await this.userRepository.findByTaxVat(taxvat);

    if (hasUserWithSameTaxVat) {
      throw new AttributeConflictError<User>("taxVat", User.name);
    }

    const hasUserWithSameEmail = await this.userRepository.findByEmail(email);

    if (hasUserWithSameEmail) {
      throw new AttributeConflictError<User>("email", User.name);
    }

    if (!crm) {
      return;
    }

    const hasDoctorWithSameCRM = await this.doctorRepository.findByCRM(
      crm.toString()
    );

    if (hasDoctorWithSameCRM) {
      throw new AttributeConflictError<Doctor>("crm", Doctor.name);
    }
  }

  private async validateZipcodeAndGetCoordinates(address: {
    zipcode: string;
    street: string;
    number: number;
    observation?: string;
  }) {
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
    return coordinates;
  }

  private async createUser(
    email: string,
    name: string,
    taxvat: string,
    password: string,
    role: RoleEnum,
    phone: string
  ) {
    const userToCreate = new User({
      email,
      name,
      taxVat: new Taxvat({ number: taxvat }),
      passwordHash: new Password({ value: Password.valueToHash(password) }),
      isAdmin: role === RoleEnum.ADMIN,
      phone: new Phone({ number: phone }),
    });

    const createdUser = await this.userRepository.create(userToCreate);
    return createdUser;
  }

  private async createDoctor(
    doctorDetails: { crm: number; specialty: string },
    createdUser: User
  ) {
    const doctorToCreate = new Doctor({
      crm: doctorDetails.crm.toString(),
      specialty: doctorDetails.specialty,
      userId: createdUser.id.toValue(),
      averageRating: 0,
    });

    await this.doctorRepository.create(doctorToCreate);
  }

  private async createLocation(
    coordinates: Coordinates[],
    address: {
      zipcode: string;
      street: string;
      number: number;
      observation?: string;
    },
    createdUser: User
  ) {
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
  }
}
