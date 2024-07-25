/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from "fastify";

import { RoleEnum } from "@/core/domain/enums/RoleEnum";

const verifyJwt =
  (rolesToVerify?: RoleEnum[]) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }

    if (!rolesToVerify) {
      return;
    }

    const { role } = request.user;

    if (!rolesToVerify.includes(role as RoleEnum)) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }
  };

export default verifyJwt;
