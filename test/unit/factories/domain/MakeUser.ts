/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { User, UserProps } from "@/core/domain/entities/User";
import { Password } from "@/core/domain/valueObjects/Password";
import { Phone } from "@/core/domain/valueObjects/Phone";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";
import { faker } from "@faker-js/faker";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId
): User {
  const newUser = new User(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      taxVat: new Taxvat({ number: "12345678900" }),
      isDoctor: faker.number.int({ min: 0, max: 1 }) === 1,
      passwordHash: new Password({ value: faker.internet.password() }),
      phone: new Phone({ number: faker.phone.number() }),
      isAdmin: faker.number.int({ min: 0, max: 1 }) === 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newUser;
}
