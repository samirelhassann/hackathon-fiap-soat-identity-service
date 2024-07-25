import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Doctor } from "@/core/domain/entities/Doctor";

export interface IDoctorRepository {
  findMany(params: PaginationParams): Promise<PaginationResponse<Doctor>>;

  findById(id: string): Promise<Doctor | null>;

  findByCRM(crm: string): Promise<Doctor | null>;

  findByUserId(userId: string): Promise<Doctor | null>;

  create(doctor: Doctor): Promise<Doctor>;

  update(doctor: Doctor): Promise<Doctor>;

  delete(doctorId: string): Promise<void>;
}
