import { PrismaDoctorAvailabilityRepository } from "./PrismaDoctorAvailabilityRepository";
import { PrismaDoctorRepository } from "./PrismaDoctorRepository";
import { PrismaLocationRepository } from "./PrismaLocationRepository";
import { PrismaUserRepository } from "./PrismaUserRepository";

let userRepositoryInstance: PrismaUserRepository;
let locationRepositoryInstance: PrismaLocationRepository;
let doctorRepositoryInstance: PrismaDoctorRepository;
let doctorAvailabilityRepositoryInstance: PrismaDoctorAvailabilityRepository;

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

export function makeDoctorRepository() {
  if (!doctorRepositoryInstance) {
    doctorRepositoryInstance = new PrismaDoctorRepository();
  }
  return doctorRepositoryInstance;
}

export function makeDoctorAvailabilityRepository() {
  if (!doctorAvailabilityRepositoryInstance) {
    doctorAvailabilityRepositoryInstance =
      new PrismaDoctorAvailabilityRepository();
  }
  return doctorAvailabilityRepositoryInstance;
}
