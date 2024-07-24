export interface RegisterUseCaseRequestDTO {
  name: string;
  email: string;
  taxvat: string;
  password: string;
  phone: string;
  role: string;
  doctorDetails: {
    crm: number;
    specialty: string;
  };
  address: {
    zipcode: number;
    street: string;
    number: number;
    observation?: string;
  };
}

export interface RegisterUseCaseResponseDTO {}
