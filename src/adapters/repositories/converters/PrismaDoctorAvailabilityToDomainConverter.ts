import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { DoctorAvailability } from "@/core/domain/entities/DoctorAvailability";
import { DoctorAvailability as PrismaDoctorAvailability } from "@prisma/client";

interface PrismaDoctorAvailabilityToDomainConverterProps {
  prismaDoctorAvailability: PrismaDoctorAvailability;
}

export class PrismaDoctorAvailabilityToDomainConverter {
  static convert({
    prismaDoctorAvailability,
  }: PrismaDoctorAvailabilityToDomainConverterProps): DoctorAvailability {
    return new DoctorAvailability(
      {
        doctorId: prismaDoctorAvailability.doctorId,
        availableFrom: prismaDoctorAvailability.availableFrom,
        availableTo: prismaDoctorAvailability.availableTo,
        dayOfWeek: prismaDoctorAvailability.dayOfWeek,
        createdAt: prismaDoctorAvailability.createdAt,
        updatedAt: prismaDoctorAvailability.updatedAt ?? undefined,
      },
      new UniqueEntityId(prismaDoctorAvailability.id)
    );
  }
}
