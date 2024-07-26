import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface DoctorAvailabilityProps {
  doctorId: string;
  dayOfWeek: number;
  availableFrom: number;
  availableTo: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class DoctorAvailability extends AggregateRoot<DoctorAvailabilityProps> {
  constructor(
    props: Optional<DoctorAvailabilityProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get doctorId() {
    return this.props.doctorId;
  }

  set doctorId(value: string) {
    this.props.doctorId = value;
    this.touch();
  }

  get dayOfWeek() {
    return this.props.dayOfWeek;
  }

  set dayOfWeek(value: number) {
    this.props.dayOfWeek = value;
    this.touch();
  }

  get availableFrom() {
    return this.props.availableFrom;
  }

  set availableFrom(value: number) {
    this.props.availableFrom = value;
    this.touch();
  }

  get availableTo() {
    return this.props.availableTo;
  }

  set availableTo(value: number) {
    this.props.availableTo = value;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
