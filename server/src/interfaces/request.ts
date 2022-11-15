export interface Request {
  body: {
    discord: string
    hourStart: string
    hourEnd: string
    name: string
    useVoiceChannel: boolean
    yearsPlaying: number
    weekDays: Array<string>
  }
  params: {
    id: string
  }
};