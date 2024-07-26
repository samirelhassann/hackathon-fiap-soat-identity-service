import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetDoctorViewModel } from "../viewModels/GetDoctorsViewModel";
import { tag } from "./constants";

export const getDoctorPathParamsSchema = z.object({
  id: z.string(),
});

const responseExample: GetDoctorViewModel = {
  id: "string",
  name: "string",
  crm: "string",
  specialty: "string",
  averageRating: 0,
  address: {
    zipcode: "string",
    street: "string",
    number: 0,
  },
};

export const getDoctorDocSchema = {
  tags: [tag],
  description: `Get ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: getDoctorPathParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
