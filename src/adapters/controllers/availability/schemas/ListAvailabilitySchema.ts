import { generateSchemaFromSampleObject } from "@/drivers/webserver/utils/generateSchemaFromSampleObject";

import { ListAvailabilityViewModel } from "../viewModels/ListAvailabilityViewModel";
import { tag } from "./constants";

const responseExample: ListAvailabilityViewModel = {
  availabilities: [
    {
      id: "123",
      dayOfWeek: 1,
      availableFrom: 8,
      availableTo: 12,
    },
  ],
};

export const listAvailabilityDocSchema = {
  tags: [tag],
  description: `List ${tag}`,
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
