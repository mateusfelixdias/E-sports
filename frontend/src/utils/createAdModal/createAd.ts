import { api } from '../../lib/api'
import { formattingAdDataAndValidating } from './formattingAdDataAndValidating'

export async function createAd(
  discord: FormDataEntryValue,
  hourEnd: FormDataEntryValue,
  hourStart: FormDataEntryValue,
  name: FormDataEntryValue,
  yearsPlaying: FormDataEntryValue,
  useVoiceChannel: boolean,
  playerSelectedGame: string,
  weekDays: string[]
) {
  const { convertedData, createAdDataIsThenValid } = await formattingAdDataAndValidating(
    discord,
    hourEnd,
    hourStart,
    name,
    yearsPlaying,
    useVoiceChannel,
    weekDays
  )

  if (createAdDataIsThenValid === true) {
    const { status } = await api.post(`/games/${playerSelectedGame}/ads`, {
      data: { ...convertedData, useVoiceChannel } ,
    })

    if (status === 204) return true

    else return false
  }

  return createAdDataIsThenValid
}