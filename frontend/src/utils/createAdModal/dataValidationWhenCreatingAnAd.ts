import * as Yup from 'yup'
import { ICreateAd } from '../../interfaces/CreateAd'

export const createAdValidation = Yup.object().shape({
  name: Yup.string().required('O nome campo é obrigatório!'),
  yearsPlaying: Yup.number()
    .positive('No campo Joga a quanto anos têm que ser um número maior ou igual a zero!')
    .required('O campo Joga a quanto anos é obrigatório!'),
  discord: Yup.string().required('O campo discord é obrigatório!'),
  weekDays: Yup.array()
    .min(1, 'Selecione algum dia da semana que você constuma jogar!')
    .required('O campo dias que você costuma jogar é obrigatório!'),
  hourStart: Yup.string().required('O campo Qual horário do dia é obrigatório!'),
  hourEnd: Yup.string().required('O campo Qual horário do dia é obrigatório!'),
  useVoiceChannel: Yup.boolean(),
})

export async function dataValidationWhenCreatingAnAd({
  discord,
  hourEnd,
  hourStart,
  name,
  useVoiceChannel,
  weekDays,
  yearsPlaying,
}: ICreateAd) {
  try {
    await createAdValidation.validate(
      {
        discord,
        hourEnd,
        hourStart,
        name,
        useVoiceChannel,
        weekDays,
        yearsPlaying,
      },
      {
        abortEarly: false,
      }
    )

    return true
  } catch (err: any) {
    return err.errors[0]
  }
}
