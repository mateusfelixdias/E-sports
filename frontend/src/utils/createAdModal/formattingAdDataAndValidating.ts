import * as Yup from 'yup'
import { dataValidationWhenCreatingAnAd } from './dataValidationWhenCreatingAnAd'
import { convertingCreateAdDataToTheCorrectFormat } from './convertingCreateAdDataToTheCorrectFormat'

export async function formattingAdDataAndValidating(
  discord: FormDataEntryValue,
  hourEnd: FormDataEntryValue,
  hourStart: FormDataEntryValue,
  name: FormDataEntryValue,
  yearsPlaying: FormDataEntryValue,
  useVoiceChannel: boolean,
  weekDays: string[]
) {
  const convertedData = convertingCreateAdDataToTheCorrectFormat(
    discord,
    hourEnd,
    hourStart,
    name,
    yearsPlaying,
    weekDays
  )

  const createAdDataIsThenValid: boolean | Yup.ValidationError[] =
    await dataValidationWhenCreatingAnAd({ ...convertedData, useVoiceChannel })

  return {
    createAdDataIsThenValid,
    convertedData,
  }
}
