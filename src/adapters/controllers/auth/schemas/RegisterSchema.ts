import { z } from "zod";

import { RoleEnum } from "@/core/domain/enums/RoleEnum";

import { tag } from "./constants";

export const registerPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  taxvat: z.string(),
  password: z.string(),
  role: z.nativeEnum(RoleEnum),
  phone: z.string(),
  doctorDetails: z.object({
    crm: z.number(),
    specialty: z.string(),
  }),
  address: z.object({
    zipcode: z.string(),
    street: z.string(),
    number: z.number(),
    observation: z.string().optional(),
  }),
});

export const registerDocSchema = {
  tags: [tag],
  description: `Register`,
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      taxvat: { type: "string" },
      password: { type: "string" },
      role: { type: "string" },
      phone: { type: "string" },
      doctorDetails: {
        type: "object",
        properties: {
          crm: { type: "number" },
          specialty: { type: "string" },
        },
      },
      address: {
        type: "object",
        properties: {
          zipcode: { type: "string" },
          street: { type: "string" },
          number: { type: "number" },
          observation: { type: "string" },
        },
      },
    },
  },
};
