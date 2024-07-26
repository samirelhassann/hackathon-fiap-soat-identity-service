import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";

import { tag } from "./constants";

export const updateAvailabilityPathParamsSchema = z.object({
  availabilityId: z.string().uuid(),
});

export const updateAvailabilityPayloadSchema = z.object({
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

export const updateAvailabilityDocSchema = {
  tags: [tag],
  description: `Update ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: updateAvailabilityPathParamsSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: updateAvailabilityPayloadSchema,
  }),
};
