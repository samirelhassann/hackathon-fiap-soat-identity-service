import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";

export interface IDoctorAvailabilityRepository {
  findById(doctorAvailabilityId: string): Promise<DoctorAvailability | null>;

  findManyByDoctorId(doctorId: string): Promise<DoctorAvailability[]>;

  create(doctorAvailability: DoctorAvailability): Promise<DoctorAvailability>;

  update(doctorAvailability: DoctorAvailability): Promise<DoctorAvailability>;

  delete(doctorAvailabilityId: string): Promise<void>;
}
