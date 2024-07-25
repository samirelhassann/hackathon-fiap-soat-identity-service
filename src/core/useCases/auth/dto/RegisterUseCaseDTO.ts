import { RoleEnum } from "@/core/domain/enums/RoleEnum";

export interface RegisterUseCaseRequestDTO {
  name: string;
  email: string;
  taxvat: string;
  password: string;
  phone: string;
  role: RoleEnum;
  doctorDetails?: {
    crm: number;
    specialty: string;
  };
  address: {
    zipcode: string;
    street: string;
    number: number;
    observation?: string;
  };
}

export interface RegisterUseCaseResponseDTO {}
