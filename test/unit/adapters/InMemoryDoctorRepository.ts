import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Doctor } from "@/core/domain/entities/Doctor";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

export class InMemoryDoctorRepository implements IDoctorRepository {
  public items: Doctor[] = [];

  async findByUserId(userId: string): Promise<Doctor | null> {
    const answer = this.items.find((a) => a.userId.toString() === userId);

    return answer ?? null;
  }

  async findMany(
    params: PaginationParams
  ): Promise<PaginationResponse<Doctor>> {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / params.size);

    const data = this.items.slice(
      (params.page - 1) * params.size,
      params.page * params.size
    );

    return new PaginationResponse<Doctor>({
      data,
      totalItems,
      currentPage: params.page,
      pageSize: params.size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Doctor | null> {
    const answer = this.items.find((a) => a.id.toString() === id);

    return answer ?? null;
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    const answer = this.items.find((a) => a.crm === crm);

    return answer ?? null;
  }

  async create(doctor: Doctor): Promise<Doctor> {
    this.items.push(doctor);

    return doctor;
  }

  async update(doctor: Doctor): Promise<Doctor> {
    const index = this.items.findIndex((a) => a.id === doctor.id);

    this.items[index] = doctor;

    return doctor;
  }

  async delete(doctorId: string): Promise<void> {
    this.items = this.items.filter((a) => a.id.toString() !== doctorId);
  }
}
