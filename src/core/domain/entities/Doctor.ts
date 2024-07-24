import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface DoctorProps {
  userId: string;
  crm: string;
  specialty: string;
  averageRating?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Doctor extends AggregateRoot<DoctorProps> {
  constructor(props: Optional<DoctorProps, "createdAt">, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
    this.touch();
  }

  get crm() {
    return this.props.crm;
  }

  set crm(value: string) {
    this.props.crm = value;
    this.touch();
  }

  get specialty() {
    return this.props.specialty;
  }

  set specialty(value: string) {
    this.props.specialty = value;
    this.touch();
  }

  get averageRating() {
    return this.props.averageRating;
  }

  set averageRating(value: number | undefined) {
    this.props.averageRating = value;
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
