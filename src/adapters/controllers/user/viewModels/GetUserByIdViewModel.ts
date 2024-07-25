export interface GetUserByIdViewModel {
  id: string;
  isDoctor: boolean;
  doctorId: string;
  name: string;
  email: string;
  taxvat: string;
  phone: string;
  address?: {
    zipcode: string;
    street: string;
    number: number;
    observation: string;
  };
}
