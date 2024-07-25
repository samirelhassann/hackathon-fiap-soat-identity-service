/* eslint-disable default-param-last */

import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Location, LocationProps } from "@/core/domain/entities/Location";
import { faker } from "@faker-js/faker";

export function makeLocation(
  override: Partial<LocationProps> = {},
  id?: UniqueEntityId
): Location {
  const newLocation = new Location(
    {
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      number: faker.number.int({ min: 1, max: 1000 }),
      observation: faker.lorem.text(),
      street: faker.lorem.text(),
      userId: faker.string.numeric(),
      zipCode: faker.address.zipCode(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );

  return newLocation;
}
