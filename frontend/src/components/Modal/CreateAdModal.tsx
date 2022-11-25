import classNames from 'classnames'
import { Input } from '../Form/Input'
import { Error } from '../Form/Alerts/Error'
import { SelectGames } from '../Form/Select'
import { IForm } from '../../interfaces/form'
import { Success } from '../Form/Alerts/Success'
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useEffect, useState } from 'react'
import { Check, GameController } from 'phosphor-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { createAd } from '../../utils/createAdModal/createAd'
import { emptyForm } from '../../utils/createAdModal/emptyForm'
import { timeValidation } from '../../utils/createAdModal/validationOfAdCreationData/timeValidation'
import { daysOfTheWeekSelected } from '../../utils/toggleGroup/daysOfTheWeekSelected'
import { listWithDaysOfTheWeek } from '../../utils/toggleGroup/listWithDaysOfTheWeek'

export function CreateAdModal() {
  const [creatingAd, setCreatingAd] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [theFieldsAreInvalid, setTheFieldsAreInvalid] = useState<boolean>(false)
  const [form, setForm] = useState<IForm>(emptyForm)

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault()
    setCreatingAd(true)

    const response = await createAd(form)
    const timeResponse = timeValidation(form.hourStart, form.hourEnd)

    if (typeof response === 'string') return handleError(response)
    if (typeof timeResponse === 'string') return handleError(timeResponse)

    return handleSuccess()
  }

  const handleError = (response: string) => {
    setCreatingAd(false)
    setErrorMessage(response)
    return
  }

  const handleSuccess = () => {
    setTimeout(() => {
      setSuccessMessage(true)
      setCreatingAd(false)
      setForm(emptyForm)

      setTimeout(() => setSuccessMessage(false), 5000)
    }, 1000)
  }

  const onCheckedChange = (checked: Checkbox.CheckedState) => {
    if (checked === true) {
      setForm({ ...form, useVoiceChannel: true })
      return
    }

    setForm({ ...form, useVoiceChannel: false })
  }

  useEffect(() => {
    if (errorMessage.length) setTheFieldsAreInvalid(true)

    setTimeout(() => {
      setTheFieldsAreInvalid(false)
      setErrorMessage('')
    }, 5000)
  }, [errorMessage])

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] text-white rounded-lg py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 table:w-full">
          {theFieldsAreInvalid ? (
            <Error message={errorMessage} />
          ) : successMessage ? (
            <Success />
          ) : null}

          <Dialog.Title className="text-3xl font-black">Públique um anúncio</Dialog.Title>

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual seu game?
              </label>

              <Select.Root
                name="game"
                onValueChange={(value: string) => setForm({ ...form, playerSelectedGame: value })}
                required
              >
                <SelectGames />
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>

              <Input
                name="name"
                required
                placeholder="como te chamam detro do game?"
                value={form.name}
                onChange={({ target: { value } }) => setForm({ ...form, name: value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos a anos?</label>

                <Input
                  required
                  type="number"
                  name="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                  value={form.yearsPlaying}
                  onChange={({ target: { value } }) => setForm({ ...form, yearsPlaying: value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord</label>

                <Input
                  name="discord"
                  required
                  placeholder="usuario#0000"
                  value={form.discord}
                  onChange={({ target: { value } }) => setForm({ ...form, discord: value })}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekdays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={form.weekDays}
                  onValueChange={(value: string[]) => setForm({ ...form, weekDays: value })}
                >
                  {listWithDaysOfTheWeek.map(({ firstLetterOfTheDay, title, value }) => {
                    return (
                      <ToggleGroup.Item
                        key={title}
                        className={classNames('w-8 h-8 rounded', {
                          'bg-violet-700': daysOfTheWeekSelected(form.weekDays, value),
                          'bg-zinc-900': !daysOfTheWeekSelected(form.weekDays, value),
                        })}
                        title={title}
                        value={value}
                      >
                        {firstLetterOfTheDay}
                      </ToggleGroup.Item>
                    )
                  })}
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <label htmlFor="hourStart">Qual horário do dia?</label>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    required
                    name="hourStart"
                    type="time"
                    placeholder="De"
                    value={form.hourStart}
                    onChange={({ target: { value } }) => setForm({ ...form, hourStart: value })}
                  />

                  <Input
                    required
                    name="hourEnd"
                    type="time"
                    placeholder="Até"
                    value={form.hourEnd}
                    onChange={({ target: { value } }) => setForm({ ...form, hourEnd: value })}
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={form.useVoiceChannel}
                onCheckedChange={onCheckedChange}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>

              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700 disabled:bg-violet-900"
                disabled={theFieldsAreInvalid || creatingAd}
                type="button"
                onClick={handleCreateAd}
              >
                <GameController size={24} />
                {creatingAd ? 'Carregando...' : 'Cadastrar'}
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
