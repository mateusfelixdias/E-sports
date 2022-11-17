export interface Request {
  body: {
    data: {
      discord: string
      hourStart: string
      hourEnd: string
      name: string
      useVoiceChannel: boolean
      yearsPlaying: number
      weekDays: number[]
    }
  }
  params: {
    id: string
  }
}
