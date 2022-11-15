import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export const adsIdDiscord = async ({ params: { id }}: Request, response: Response) => {
  const prisma = new PrismaClient();
  const addId = id;

  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: addId,
    },
  });

  return response.status(200).json({
    discord,
  });
};