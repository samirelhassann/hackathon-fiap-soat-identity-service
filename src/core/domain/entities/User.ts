import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { Password } from "../valueObjects/Password";
import { Phone } from "../valueObjects/Phone";
import { Taxvat } from "../valueObjects/Taxvat";

export interface UserProps {
  name: string;
  email: string;
  taxVat: Taxvat;
  passwordHash: Password;
  phone: Phone;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot<UserProps> {
  constructor(props: Optional<UserProps, "createdAt">, id?: UniqueEntityId) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get email() {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
    this.touch();
  }

  get taxVat() {
    return this.props.taxVat;
  }

  set taxVat(value: Taxvat) {
    this.props.taxVat = value;
    this.touch();
  }

  get passwordHash() {
    return this.props.passwordHash;
  }

  get phone() {
    return this.props.phone;
  }

  set phone(value: Phone) {
    this.props.phone = value;
    this.touch();
  }

  get isAdmin() {
    return this.props.isAdmin;
  }

  set isAdmin(value: boolean) {
    this.props.isAdmin = value;
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
