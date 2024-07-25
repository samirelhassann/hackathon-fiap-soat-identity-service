export interface GetUserByIdViewModel {
  id: string;
  name: string;
  email: string;
  taxvat: string;
  phone: string;
  doctorDetails?: {
    crm?: number;
    specialty?: string;
  };
  address?: {
    zipcode: string;
    street: string;
    number: number;
    observation: string;
    latitude?: number;
    longitude?: number;
  };
}
