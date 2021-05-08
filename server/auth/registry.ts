import { StripeCustomer } from ".prisma/client";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../../app/utils/prisma.server";

interface Credentials {
  username: string;
  licenseKey: string;
}

let registryAuth = async (request: Request, response: Response) => {
  let authorization = request.headers.authorization;
  if (!authorization) {
    return response.status(401).send("Authorization header missing");
  }

  let [, jwt] = authorization.split("Bearer ");
  if (!jwt) {
    return response
      .status(401)
      .send("Invalid authorization header, it must use the Bearer scheme");
  }

  let credentials: Credentials;
  try {
    credentials = await new Promise((res, rej) => {
      verify(jwt, process.env.REGISTRY_AUTH_SECRET!, (err, decoded) => {
        if (err) {
          return rej(err);
        }

        return res(decoded as Credentials);
      });
    });
  } catch (err) {
    console.error(err);
    return response.status(401).send(err.message);
  }

  let user: { stripeCustomer: StripeCustomer | null } | null;
  try {
    user = await prisma.user.findUnique({
      where: {
        username: credentials.username,
      },
      select: {
        stripeCustomer: true,
      },
    });
  } catch (err) {
    console.error(err);
    return response.status(401).send("Something went wrong");
  }

  if (
    !user?.stripeCustomer ||
    user.stripeCustomer.licenseKey !== credentials.licenseKey
  ) {
    return response.status(401).send("Invalid credentials");
  }

  return response.status(200).send("Authorized");
};

export { registryAuth };
