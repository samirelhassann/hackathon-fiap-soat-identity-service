import { ValueObject } from "../base/entities/ValueObject";
import { UnsupportedArgumentValueError } from "../base/errors/entities/UnsupportedArgumentValueError";
import { AppointmentStatusEnum } from "../enums/AppointmentStatusEnum";
import { RoleEnum } from "../enums/RoleEnum";

export interface RoleProps {
  name: AppointmentStatusEnum;
}

export class AppointmentStatus extends ValueObject<RoleProps> {
  constructor(props: RoleProps) {
    super({
      ...props,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Object.values(RoleEnum).includes(props.name as any)) {
      throw new UnsupportedArgumentValueError(AppointmentStatus.name);
    }
  }

  get name() {
    return this.props.name;
  }

  set name(value: AppointmentStatusEnum) {
    this.props.name = value;
  }
}
