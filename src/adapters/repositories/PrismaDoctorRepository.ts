import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Doctor } from "@/core/domain/entities/Doctor";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaDoctorToDomainConverter } from "./converters/PrismaDoctorToDomainConverter";

export class PrismaDoctorRepository implements IDoctorRepository {
  async findByCRM(crm: string): Promise<Doctor | null> {
    return prisma.doctor
      .findUnique({
        where: {
          crm,
        },
      })
      .then((doctor) =>
        doctor ? PrismaDoctorToDomainConverter.convert(doctor) : null
      );
  }

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Doctor>> {
    const totalItems = await prisma.doctor.count();
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.doctor.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Doctor>({
      data: data.map((c) => PrismaDoctorToDomainConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Doctor | null> {
    return prisma.doctor
      .findUnique({
        where: {
          id,
        },
      })
      .then((doctor) =>
        doctor ? PrismaDoctorToDomainConverter.convert(doctor) : null
      );
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    return prisma.doctor
      .findUnique({
        where: {
          userId,
        },
      })
      .then((doctor) =>
        doctor ? PrismaDoctorToDomainConverter.convert(doctor) : null
      );
  }

  async create(doctor: Doctor): Promise<Doctor> {
    return prisma.doctor
      .create({
        data: {
          id: doctor.id.toString(),
          userId: doctor.userId,
          specialty: doctor.specialty,
          crm: doctor.crm,
          averageRating: doctor.averageRating,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
        },
      })
      .then((createdDoctor) =>
        PrismaDoctorToDomainConverter.convert(createdDoctor)
      );
  }

  async update(doctor: Doctor): Promise<Doctor> {
    return prisma.doctor
      .update({
        where: {
          id: doctor.id.toString(),
        },
        data: {
          specialty: doctor.specialty,
          crm: doctor.crm,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
        },
      })
      .then((updatedDoctor) =>
        PrismaDoctorToDomainConverter.convert(updatedDoctor)
      );
  }

  async delete(doctorId: string): Promise<void> {
    await prisma.doctor.delete({
      where: {
        id: doctorId,
      },
    });
  }
}
