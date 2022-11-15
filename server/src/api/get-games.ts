import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const getGames = async (request: Request, response: Response) => {
  const prisma = new PrismaClient()

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.status(200).json(games).end();
};