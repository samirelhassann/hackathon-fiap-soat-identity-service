/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Doctor, DoctorProps } from "@/core/domain/entities/Doctor";
import { faker } from "@faker-js/faker";

export function makeDoctor(
  override: Partial<DoctorProps> = {},
  id?: UniqueEntityId
): Doctor {
  const newDoctor = new Doctor(
    {
      crm: faker.number.int({ min: 1, max: 1000 }).toString(),
      averageRating: faker.number.float({ min: 0, max: 5 }),
      specialty: faker.lorem.word(),
      userId: faker.string.numeric(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newDoctor;
}
