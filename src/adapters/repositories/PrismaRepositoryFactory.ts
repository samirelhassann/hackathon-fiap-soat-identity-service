import { PrismaLocationRepository } from "./PrismaLocationRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";

let userRepositoryInstance: PrismaUserRepository;
let locationRepositoryInstance: PrismaLocationRepository;

export function makeUserRepository() {
  if (!userRepositoryInstance) {
    userRepositoryInstance = new PrismaUserRepository();
  }
  return userRepositoryInstance;
}

export function makeLocationRepository() {
  if (!locationRepositoryInstance) {
    locationRepositoryInstance = new PrismaLocationRepository();
  }
  return locationRepositoryInstance;
}
