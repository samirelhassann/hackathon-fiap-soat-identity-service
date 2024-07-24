import { ValueObject } from "../base/entities/ValueObject";

export interface PhoneProps {
  number: string;
}

export class Phone extends ValueObject<PhoneProps> {
  constructor(props: PhoneProps) {
    super({
      ...props,
    });
  }

  get number() {
    return this.props.number;
  }
}
