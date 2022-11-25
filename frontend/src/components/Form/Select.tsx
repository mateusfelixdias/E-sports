import { api } from '../../lib/api'
import { useEffect, useState } from 'react'
import { IGames } from '../../interfaces/Games'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { IPropsGameSelect } from '../../interfaces/PropsGameSelect'

export function SelectGames() {
  const [games, setGames] = useState<Array<IPropsGameSelect>>([])

  useEffect(() => {
    const games = async () => {
      const { data }: IGames = await api.get('/games')

      setGames(data)
    }

    games()
  }, [])

  return (
    <>
      <Select.Trigger
        className="bg-zinc-900 py-3 px-4 rounded text-sm inline-flex items-center justify-between"
        aria-label="Food"
      >
        <Select.Value placeholder="Selecione o gamer que deseja jogar" />
        <Select.Icon className="bg-violet-400 hover:bg-violet-700 rounded">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-zinc-900 rounded absolute px-4 pb-2 w-full">
          <Select.Viewport>
            <Select.Group>
              {games.map(({ id, title }) => {
                return (
                  <Select.Item
                    key={id}
                    value={id}
                    className="text-1xl flex items-center relative text-zinc-300"
                  >
                    <Select.ItemText>{title}</Select.ItemText>
                  </Select.Item>
                )
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </>
  )
}
