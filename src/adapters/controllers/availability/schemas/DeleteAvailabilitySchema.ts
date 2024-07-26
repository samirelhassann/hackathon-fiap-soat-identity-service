import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "@/drivers/webserver/utils/convertZodSchemaToDocsTemplate";

import { tag } from "./constants";

export const deleteAvailabilityPathParamsSchema = z.object({
  availabilityId: z.string().uuid(),
});

export const deleteAvailabilityDocSchema = {
  tags: [tag],
  description: `Delete ${tag}`,
  params: convertZodSchemaToDocsTemplate({
    schema: deleteAvailabilityPathParamsSchema,
  }),
};
