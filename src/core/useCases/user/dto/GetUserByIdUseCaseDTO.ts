import { Doctor } from "@/core/domain/entities/Doctor";
import { Location } from "@/core/domain/entities/Location";
import { User } from "@/core/domain/entities/User";

export interface GetUserByIdUseCaseRequestDTO {
  id: string;
}

export interface GetUserByIdUseCaseResponseDTO {
  user: User;
  doctorDetails: Doctor | null;
  location: Location | null;
}
