import * as Yup from 'yup'
import classNames from 'classnames'
import { Input } from '../Form/Input'
import { FormEvent, useState } from 'react'
import { SelectGames } from '../Form/Select'
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, GameController } from 'phosphor-react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { createAd } from '../../utils/createAdModal/createAd'
import { daysOfTheWeekSelected } from '../../utils/toggleGroup/daysOfTheWeekSelected'
import { listWithDaysOfTheWeek } from '../../utils/toggleGroup/listWithDaysOfTheWeek'

export function CreateAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
  const [playerSelectedGame, setPlayerSelectedGame] = useState<string>('')
  const [loadingAdCreation, setLoadingAdCreation] = useState<boolean>(false)
  const [fieldsAreValid, setFieldsAreValid] = useState<boolean | Yup.ValidationError[]>(false)

  function onCheckedChange(checked: Checkbox.CheckedState) {
    if (checked === true) {
      setUseVoiceChannel(true)
      return
    }

    setUseVoiceChannel(false)
  }

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const { discord, hourEnd, hourStart, name, yearsPlaying } = Object.fromEntries(formData)

    await createAd(
      discord,
      hourEnd,
      hourStart,
      name,
      yearsPlaying,
      useVoiceChannel,
      playerSelectedGame,
      weekDays
    )
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] text-white rounded-lg py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 table:w-full">
          <Dialog.Title className="text-3xl font-black">Públique um anúncio</Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual seu game?
              </label>

              <Select.Root onValueChange={setPlayerSelectedGame} required>
                <SelectGames />
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>

              <Input name="name" id="name" placeholder="como te chamam detro do game?" required />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos a anos?</label>

                <Input
                  required
                  type="number"
                  id="yearsPlaying"
                  name="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord</label>

                <Input name="discord" id="discord" placeholder="usuario#0000" required />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekdays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  {listWithDaysOfTheWeek.map(({ firstLetterOfTheDay, title, value }) => {
                    return (
                      <ToggleGroup.Item
                        key={title}
                        className={classNames('w-8 h-8 rounded', {
                          'bg-violet-700': daysOfTheWeekSelected(weekDays, value),
                          'bg-zinc-900': !daysOfTheWeekSelected(weekDays, value),
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
                  <Input required name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input required name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                checked={useVoiceChannel}
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
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                disabled={loadingAdCreation}
                type="submit"
                onSubmit={() => setLoadingAdCreation(true)}
              >
                <GameController size={24} />
                {loadingAdCreation ? 'Carregando...' : 'Cadastrar'}
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
