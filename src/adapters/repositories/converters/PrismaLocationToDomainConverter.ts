import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Location } from "@/core/domain/entities/Location";
import { Location as PrismaLocation } from "@prisma/client";

export class PrismaLocationToDomainConverter {
  static convert(prismaLocation: PrismaLocation): Location {
    return new Location(
      {
        latitude: prismaLocation.latitude,
        longitude: prismaLocation.longitude,
        number: prismaLocation.number,
        street: prismaLocation.street,
        userId: prismaLocation.userId,
        zipCode: prismaLocation.zipCode,
        observation: prismaLocation.observation ?? undefined,
        createdAt: prismaLocation.createdAt,
        updatedAt: prismaLocation.updatedAt ?? undefined,
      },
      new UniqueEntityId(prismaLocation.id)
    );
  }
}
