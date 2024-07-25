import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Doctor } from "@/core/domain/entities/Doctor";
import { Doctor as PrismaDoctor } from "@prisma/client";

export class PrismaDoctorToDomainConverter {
  static convert(prismaDoctor: PrismaDoctor): Doctor {
    return new Doctor(
      {
        userId: prismaDoctor.userId,
        crm: prismaDoctor.crm,
        specialty: prismaDoctor.specialty,
        averageRating: prismaDoctor.averageRating ?? undefined,
        createdAt: prismaDoctor.createdAt,
        updatedAt: prismaDoctor.updatedAt ?? undefined,
      },
      new UniqueEntityId(prismaDoctor.id)
    );
  }
}
