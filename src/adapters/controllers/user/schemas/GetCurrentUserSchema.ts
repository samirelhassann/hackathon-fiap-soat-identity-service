import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetUserByIdViewModel } from "../viewModels/GetUserByIdViewModel";
import { tag } from "./constants";

const responseExample: GetUserByIdViewModel = {
  id: "string",
  isDoctor: false,
  doctorId: "string",
  name: "string",
  email: "string",
  taxvat: "string",
  phone: "string",
  address: {
    zipcode: "string",
    street: "string",
    number: 0,
    observation: "string",
  },
};

export const getCurrentUserDocSchema = {
  tags: [tag],
  description: `Get current ${tag}`,
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
