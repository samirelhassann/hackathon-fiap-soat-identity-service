import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";

import { tag } from "./constants";

export const createAvailabilityPayloadSchema = z.object({
  dayOfWeek: z
    .number()
    .int()
    .min(0, {
      message: "Day of week must be between 0 and 6",
    })
    .max(6, {
      message: "Day of week must be between 0 and 6",
    }),
  availableFrom: z
    .number()
    .int()
    .min(0, {
      message: "Available from must be between 0 and 23",
    })
    .max(23, {
      message: "Available from must be between 0 and 23",
    }),
  availableUntil: z
    .number()
    .int()
    .min(0, {
      message: "Available until must be between 0 and 23",
    })
    .max(23, {
      message: "Available until must be between 0 and 23",
    }),
});

export const createAvailabilityDocSchema = {
  tags: [tag],
  description: `Create ${tag}`,
  body: convertZodSchemaToDocsTemplate({
    schema: createAvailabilityPayloadSchema,
  }),
};
