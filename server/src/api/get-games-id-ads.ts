import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string'

interface Ads {
  hourEnd: number
  hourStart: number
  id: string
  name: string
  useVoiceChannel: boolean
  weekDays: string
  yearsPlaying: number
};

export const getGamesIds = async ({ params: { id } }: Request, response: Response) => {
  const gameId = id
  const prisma = new PrismaClient()

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const convertWeekDaysHourstartHoursEnd = ads.map((ad: Ads) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  });

  return response.status(200).json(convertWeekDaysHourstartHoursEnd).end();
};