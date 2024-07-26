import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { GetDoctorAvailabilityViewModel } from "../viewModels/GetDoctorAvailabilityViewModel";
import { tag } from "./constants";

export const getDoctorAvailabilityPathParamsSchema = z.object({
  doctorId: z.string(),
});

export const getDoctorAvailabilityQuerySchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const responseExample: GetDoctorAvailabilityViewModel = {
  availabilities: [
    {
      date: "string",
      slots: [
        {
          startTime: "string",
          endTime: "string",
        },
      ],
    },
  ],
};

export const getDoctorAvailabilityDocSchema = {
  tags: [tag],
  description: `Get ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: getDoctorAvailabilityPathParamsSchema,
  }),
  query: convertZodSchemaToDocsTemplate({
    schema: getDoctorAvailabilityQuerySchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
