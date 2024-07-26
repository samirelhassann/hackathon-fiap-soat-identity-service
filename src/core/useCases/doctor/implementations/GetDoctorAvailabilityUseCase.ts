import { IDoctorAvailabilityRepository } from "@/core/interfaces/repositories/IDoctorAvailabilityRepository";
import { IDoctorRepository } from "@/core/interfaces/repositories/IDoctorRepository";

import {
  GetDoctorAvailabilityUseCaseRequestDTO,
  GetDoctorAvailabilityUseCaseResponseDTO,
} from "../dto/GetDoctorAvailabilityUseCaseDTO";

export class GetDoctorAvailabilityUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorAvailabilityRepository: IDoctorAvailabilityRepository
  ) {}

  async execute({
    doctorId,
    endDate,
    startDate,
  }: GetDoctorAvailabilityUseCaseRequestDTO): Promise<GetDoctorAvailabilityUseCaseResponseDTO> {
    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    if (startDate > endDate) {
      throw new Error("StartDate must be before or equals to endDate");
    }

    const doctorAvailabilities =
      await this.doctorAvailabilityRepository.findManyByDoctorId(doctorId);

    if (!doctorAvailabilities.length) {
      return {
        availabilities: [],
      };
    }

    const defaultDurationSession = 50; // Duration in minutes
    const restDuration = 10; // Rest duration in minutes
    const availabilitiesMap: {
      [key: string]: { startTime: string; endTime: string }[];
    } = {};

    const timeZone = "America/Sao_Paulo";

    const formatTime = (date: Date) =>
      new Intl.DateTimeFormat("pt-BR", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);

    const formatDateWithWeekday = (date: Date) => {
      const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);

      const weekday = new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
      }).format(date);

      return `${formattedDate} (${weekday})`;
    };

    doctorAvailabilities.forEach(
      ({ dayOfWeek, availableFrom, availableTo }) => {
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          if (currentDate.getDay() === dayOfWeek) {
            const startTime = new Date(currentDate);
            startTime.setHours(availableFrom, 0, 0, 0);

            const endTime = new Date(currentDate);
            endTime.setHours(availableTo, 0, 0, 0);

            while (startTime < endTime) {
              const slotEndTime = new Date(startTime);
              slotEndTime.setMinutes(
                slotEndTime.getMinutes() + defaultDurationSession
              );

              if (slotEndTime <= endTime) {
                const dateKey = formatDateWithWeekday(currentDate);
                if (!availabilitiesMap[dateKey]) {
                  availabilitiesMap[dateKey] = [];
                }
                availabilitiesMap[dateKey].push({
                  startTime: formatTime(startTime),
                  endTime: formatTime(slotEndTime),
                });
              }

              startTime.setMinutes(
                startTime.getMinutes() + defaultDurationSession + restDuration
              );
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    );

    const availabilities = Object.entries(availabilitiesMap).map(
      ([date, slots]) => ({
        date,
        slots,
      })
    );

    return {
      availabilities,
    };
  }
}
