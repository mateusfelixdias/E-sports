import { api } from '../../lib/api'
import { IForm } from '../../interfaces/form'
import { dataValidationWhenCreatingAnAd } from './validationOfAdCreationData/dataValidationWhenCreatingAnAd'

export async function createAd(form: IForm) {
  const createAdDataIsThenValid: boolean | string = await dataValidationWhenCreatingAnAd(form)

  if (createAdDataIsThenValid === true) {
    const { status } = await api.post(`/games/${form.playerSelectedGame}/ads`, {
      data: {
        ...form,
        yearsPlaying: Number(form.yearsPlaying),
        weekDays: form.weekDays.map(Number),
      },
    })

    if (status === 201) return true
    else return 'Não foi possivel criar seu anúncio, tente novamente.'
  }

  return createAdDataIsThenValid
}
