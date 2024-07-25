export interface AuthenticateUseCaseRequestDTO {
  login: string;
  password: string;
}

export interface AuthenticateUseCaseResponseDTO {
  role: string;
  userId: string;
}
