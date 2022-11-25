import * as Yup from 'yup'
import { IForm } from '../../../interfaces/form'

export const createAdValidation = Yup.object().shape({
  name: Yup.string().required('O campo seu nome (ou nickname) é obrigatório!'),
  yearsPlaying: Yup.number().positive(
    'O campo Joga a quanto anos é obrigatório. Além disso, têm que ser um número maior ou igual a zero!'
  ),
  discord: Yup.string().required('O campo discord é obrigatório!'),
  weekDays: Yup.array()
    .min(1, 'Selecione algum dia da semana que você constuma jogar!')
    .required('O campo dias que você costuma jogar é obrigatório!'),
  hourStart: Yup.string().required('O campo Qual horário do dia é obrigatório!'),
  hourEnd: Yup.string().required('O campo Qual horário do dia é obrigatório!'),
  playerSelectedGame: Yup.string().required('Ops, você esqueceu de selecionar um game!'),
  useVoiceChannel: Yup.boolean(),
})

export async function dataValidationWhenCreatingAnAd(form: IForm) {
  try {
    await createAdValidation.validate(
      {
        ...form,
        yearsPlaying: Number(form.yearsPlaying),
        weekDays: form.weekDays.map(Number),
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
