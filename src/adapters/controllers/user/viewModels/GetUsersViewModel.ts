export interface GetUserViewModel {
  id: string;
  name: string;
  email: string;
  taxVat: string;
  isDoctor: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface GetUsersViewModel {
  data: GetUserViewModel[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
