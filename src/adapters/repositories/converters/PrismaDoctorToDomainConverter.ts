import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Doctor } from "@/core/domain/entities/Doctor";
import {
  Doctor as PrismaDoctor,
  Location as PrismaLocation,
  User as PrismaUser,
} from "@prisma/client";

import { PrismaLocationToDomainConverter } from "./PrismaLocationToDomainConverter";
import { PrismaUserToDomainConverter } from "./PrismaUserToDomainConverter";

interface PrismaDoctorToDomainConverterProps {
  prismaDoctor: PrismaDoctor;
  prismaLocation?: PrismaLocation;
  prismaUser?: PrismaUser;
}

export class PrismaDoctorToDomainConverter {
  static convert({
    prismaDoctor,
    prismaLocation,
    prismaUser,
  }: PrismaDoctorToDomainConverterProps) {
    return new Doctor(
      {
        userId: prismaDoctor.userId,
        crm: prismaDoctor.crm,
        specialty: prismaDoctor.specialty,
        averageRating: prismaDoctor.averageRating ?? undefined,
        createdAt: prismaDoctor.createdAt,
        updatedAt: prismaDoctor.updatedAt ?? undefined,

        user: prismaUser
          ? PrismaUserToDomainConverter.convert(prismaUser)
          : undefined,

        location: prismaLocation
          ? PrismaLocationToDomainConverter.convert(prismaLocation)
          : undefined,
      },
      new UniqueEntityId(prismaDoctor.id)
    );
  }
}
