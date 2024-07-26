import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetDoctorsViewModel } from "../viewModels/GetDoctorsViewModel";
import { tag } from "./constants";

export const getDoctorsQueryParamsSchema = z.object({
  specialty: z.string().optional(),
  zipcode: z.string().optional(),
  distance: z.number().default(10),
  rating: z.number().optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

const responseExample: GetDoctorsViewModel = {
  data: [
    {
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
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getDoctorsDocSchema = {
  tags: [tag],
  description: `Get ${tag}s`,
  querystring: convertZodSchemaToDocsTemplate({
    schema: getDoctorsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
