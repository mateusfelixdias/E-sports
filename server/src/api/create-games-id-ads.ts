import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { Request } from '../interfaces/request'
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes'

export const create = async ({ body, params }: Request, response: Response) => {
  const { discord, hourEnd, hourStart, name, useVoiceChannel, weekDays, yearsPlaying } = body
  const { id } = params;

  const gameId = id;
  const prisma = new PrismaClient()

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel,
    },
  });

  return response.status(200).json(ad).end();
};