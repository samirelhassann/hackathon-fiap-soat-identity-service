export interface GetDoctorAvailabilityViewModel {
  availabilities: {
    date: string;
    slots: {
      startTime: string;
      endTime: string;
    }[];
  }[];
}
