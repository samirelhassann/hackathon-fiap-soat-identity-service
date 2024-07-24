import { Location } from "@/core/domain/entities/Location";
import { ILocationRepository } from "@/core/interfaces/repositories/ILocationRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaLocationToDomainConverter } from "./converters/PrismaLocationToDomainConverter";

export class PrismaLocationRepository implements ILocationRepository {
  async findByUserId(userId: string): Promise<Location | null> {
    return prisma.location
      .findUnique({
        where: {
          userId,
        },
      })
      .then((location) =>
        location ? PrismaLocationToDomainConverter.convert(location) : null
      );
  }

  async create(location: Location): Promise<Location> {
    return prisma.location
      .create({
        data: {
          id: location.id.toString(),
          latitude: location.latitude,
          longitude: location.longitude,
          number: location.number,
          street: location.street,
          userId: location.userId,
          zipCode: location.zipCode,
          observation: location.observation,
        },
      })
      .then((createdLoc) =>
        PrismaLocationToDomainConverter.convert(createdLoc)
      );
  }

  async update(location: Location): Promise<Location> {
    return prisma.location
      .update({
        where: {
          id: location.id.toString(),
        },
        data: {
          latitude: location.latitude,
          longitude: location.longitude,
          number: location.number,
          street: location.street,
          userId: location.userId,
          zipCode: location.zipCode,
          observation: location.observation,
        },
      })
      .then((updatedLoc) =>
        PrismaLocationToDomainConverter.convert(updatedLoc)
      );
  }

  async delete(locationId: string): Promise<void> {
    await prisma.location.delete({
      where: {
        id: locationId,
      },
    });
  }
}
