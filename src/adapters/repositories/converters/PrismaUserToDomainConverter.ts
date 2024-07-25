import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { User } from "@/core/domain/entities/User";
import { Password } from "@/core/domain/valueObjects/Password";
import { Phone } from "@/core/domain/valueObjects/Phone";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserToDomainConverter {
  static convert(prismaUser: PrismaUser): User {
    return new User(
      {
        name: prismaUser.name,
        email: prismaUser.email,
        taxVat: new Taxvat({ number: prismaUser.taxVat }),
        passwordHash: new Password({ value: prismaUser.passwordHash }),
        isAdmin: prismaUser.isAdmin,
        isDoctor: prismaUser.isDoctor,
        phone: new Phone({
          number: prismaUser.phone,
        }),
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt ?? undefined,
      },
      new UniqueEntityId(prismaUser.id)
    );
  }
}
