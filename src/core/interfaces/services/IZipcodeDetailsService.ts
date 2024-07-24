import { ZipCodeDetails } from "@/core/domain/valueObjects/ZipCodeDetails";

export interface IZipCodeDetailsService {
  getZipcodeDetails(zipcode: string): Promise<ZipCodeDetails>;
}
