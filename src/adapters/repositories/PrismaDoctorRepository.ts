import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Doctor } from "@/core/domain/entities/Doctor";
import {
  SearchDoctor,
  IDoctorRepository,
} from "@/core/interfaces/repositories/IDoctorRepository";
import { calculateDistance } from "@/core/utils/DistanceUtils";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaDoctorToDomainConverter } from "./converters/PrismaDoctorToDomainConverter";

export class PrismaDoctorRepository implements IDoctorRepository {
  async findMany(
    params: PaginationParams,
    searchParams: SearchDoctor
  ): Promise<PaginationResponse<Doctor>> {
    const { page, size } = params;
    const { specialty, latitude, longitude, distance, rating } = searchParams;

    const specialtyWhere = specialty ? { specialty } : {};
    const ratingWhere = rating ? { averageRating: { gte: rating } } : {};

    let doctors = await prisma.doctor.findMany({
      where: {
        user: {
          isDoctor: true,
        },
        ...specialtyWhere,
        ...ratingWhere,
      },
      include: {
        user: {
          include: {
            locations: true,
          },
        },
      },
    });

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      distance !== undefined
    ) {
      doctors = doctors.filter((doctor) => {
        const location = doctor.user?.locations[0];
        if (location) {
          const dist = calculateDistance(
            latitude,
            longitude,
            location.latitude,
            location.longitude
          );
          return dist <= distance;
        }
        return false;
      });
    }

    const totalItems = doctors.length;
    const totalPages = Math.ceil(totalItems / size);
    const paginatedDoctors = doctors.slice((page - 1) * size, page * size);

    return new PaginationResponse<Doctor>({
      data: paginatedDoctors.map((c) =>
        PrismaDoctorToDomainConverter.convert({
          prismaDoctor: c,
          prismaLocation: c.user?.locations[0],
          prismaUser: c.user,
        })
      ),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    return prisma.doctor
      .findUnique({
        where: {
          crm,
        },
      })
      .then((doctor) =>
        doctor
          ? PrismaDoctorToDomainConverter.convert({
              prismaDoctor: doctor,
            })
          : null
      );
  }

  async findById(id: string): Promise<Doctor | null> {
    return prisma.doctor
      .findUnique({
        where: {
          id,
        },
        include: {
          user: {
            include: {
              locations: true,
            },
          },
        },
      })
      .then((doctor) =>
        doctor
          ? PrismaDoctorToDomainConverter.convert({
              prismaDoctor: doctor,
              prismaLocation: doctor.user?.locations[0],
              prismaUser: doctor.user,
            })
          : null
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
        doctor
          ? PrismaDoctorToDomainConverter.convert({
              prismaDoctor: doctor,
            })
          : null
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
        PrismaDoctorToDomainConverter.convert({
          prismaDoctor: createdDoctor,
        })
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
        PrismaDoctorToDomainConverter.convert({
          prismaDoctor: updatedDoctor,
        })
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
