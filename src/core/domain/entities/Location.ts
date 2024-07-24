import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";

export interface LocationProps {
  userId: string;
  latitude: number;
  longitude: number;
  zipCode: string;
  street: string;
  number: number;
  observation?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Location extends AggregateRoot<LocationProps> {
  constructor(
    props: Optional<LocationProps, "createdAt">,
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

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
    this.touch();
  }

  get latitude() {
    return this.props.latitude;
  }

  set latitude(value: number) {
    this.props.latitude = value;
    this.touch();
  }

  get longitude() {
    return this.props.longitude;
  }

  set longitude(value: number) {
    this.props.longitude = value;
    this.touch();
  }

  get zipCode() {
    return this.props.zipCode;
  }

  set zipCode(value: string) {
    this.props.zipCode = value;
    this.touch();
  }

  get street() {
    return this.props.street;
  }

  set street(value: string) {
    this.props.street = value;
    this.touch();
  }

  get number() {
    return this.props.number;
  }

  set number(value: number) {
    this.props.number = value;
    this.touch();
  }

  get observation() {
    return this.props.observation;
  }

  set observation(value: string | undefined) {
    this.props.observation = value;
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
