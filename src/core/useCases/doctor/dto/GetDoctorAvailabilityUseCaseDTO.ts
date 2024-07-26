export interface GetDoctorAvailabilityUseCaseRequestDTO {
  doctorId: string;
  startDate: Date;
  endDate: Date;
}

export interface GetDoctorAvailabilityUseCaseResponseDTO {
  availabilities: {
    date: string;
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
}
