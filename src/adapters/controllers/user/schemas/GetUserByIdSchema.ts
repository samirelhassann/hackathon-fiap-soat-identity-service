import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetUserByIdViewModel } from "../viewModels/GetUserByIdViewModel";
import { tag } from "./constants";

export const getUserByIdQueryParamsSchema = z.object({
  id: z.string(),
});

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

export const getUserByIdDocSchema = {
  tags: [tag],
  description: `Get ${tag} by id`,
  params: convertZodSchemaToDocsTemplate({
    schema: getUserByIdQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
