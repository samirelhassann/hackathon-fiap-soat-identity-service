export interface GetDoctorViewModel {
  id: string;
  name?: string;
  crm: string;
  specialty: string;
  averageRating?: number;
  address?: {
    zipcode?: string;
    street?: string;
    number?: number;
  };
}

export interface GetDoctorsViewModel {
  data: GetDoctorViewModel[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
