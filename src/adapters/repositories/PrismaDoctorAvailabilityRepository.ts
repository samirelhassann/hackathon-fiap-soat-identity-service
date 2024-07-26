import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";
import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaDoctorAvailabilityToDomainConverter } from "./converters/PrismaDoctorAvailabilityToDomainConverter";

export class PrismaDoctorAvailabilityRepository
  implements IDoctorAvailabilityRepository
{
  async findById(
    doctorAvailabilityId: string
  ): Promise<DoctorAvailability | null> {
    return prisma.doctorAvailability
      .findUnique({
        where: {
          id: doctorAvailabilityId,
        },
      })
      .then((availability) =>
        availability
          ? PrismaDoctorAvailabilityToDomainConverter.convert({
              prismaDoctorAvailability: availability,
            })
          : null
      );
  }

  async findManyByDoctorId(doctorId: string): Promise<DoctorAvailability[]> {
    return prisma.doctorAvailability
      .findMany({
        where: {
          doctorId,
        },
      })
      .then((availabilities) =>
        availabilities.map((availability) =>
          PrismaDoctorAvailabilityToDomainConverter.convert({
            prismaDoctorAvailability: availability,
          })
        )
      );
  }

  async create(
    doctorAvailability: DoctorAvailability
  ): Promise<DoctorAvailability> {
    return prisma.doctorAvailability
      .create({
        data: {
          id: doctorAvailability.id.toString(),
          doctorId: doctorAvailability.doctorId,
          availableFrom: doctorAvailability.availableFrom,
          availableTo: doctorAvailability.availableTo,
          dayOfWeek: doctorAvailability.dayOfWeek,
        },
      })
      .then((availability) =>
        PrismaDoctorAvailabilityToDomainConverter.convert({
          prismaDoctorAvailability: availability,
        })
      );
  }

  async update(
    doctorAvailability: DoctorAvailability
  ): Promise<DoctorAvailability> {
    return prisma.doctorAvailability
      .update({
        where: {
          id: doctorAvailability.id.toString(),
        },
        data: {
          availableFrom: doctorAvailability.availableFrom,
          availableTo: doctorAvailability.availableTo,
          dayOfWeek: doctorAvailability.dayOfWeek,
        },
      })
      .then((availability) =>
        PrismaDoctorAvailabilityToDomainConverter.convert({
          prismaDoctorAvailability: availability,
        })
      );
  }

  async delete(doctorAvailabilityId: string): Promise<void> {
    await prisma.doctorAvailability.delete({
      where: {
        id: doctorAvailabilityId,
      },
    });
  }
}
