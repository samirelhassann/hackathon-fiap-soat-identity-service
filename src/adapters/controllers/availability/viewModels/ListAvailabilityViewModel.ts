export interface ListAvailabilityViewModel {
  availabilities: {
    id: string;
    dayOfWeek: number;
    availableFrom: number;
    availableTo: number;
  }[];
}
