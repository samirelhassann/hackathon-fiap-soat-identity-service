import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Doctor } from "@/core/domain/entities/Doctor";

export interface GetDoctorsUseCaseRequestDTO {
  params: PaginationParams;
  searchParams?: {
    specialty?: string;
    zipCode?: string;
    distance?: number;
    rating?: number;
  };
}

export interface GetDoctorsUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Doctor>;
}
