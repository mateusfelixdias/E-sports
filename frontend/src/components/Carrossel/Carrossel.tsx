import { api } from '../../lib/api'
import { useEffect, useState } from 'react'
import { IGames } from '../../interfaces/Games'
import AliceCarousel from 'react-alice-carousel'
import { GameBanner } from '../Banner/GameBanner'
import { responsive } from '../../utils/carousel/responsive'

import 'react-alice-carousel/lib/alice-carousel.css'

export function Carrossel() {
  const [games, setGames] = useState<JSX.Element[]>()

  useEffect(() => {
    const games = async () => {
      const { data }: IGames = await api.get('/games')

      const games = data.map(({ _count: { ads }, bannerUrl, id, title }) => {
        return <GameBanner adsCount={ads} bannerUrl={bannerUrl} key={id} title={title} />
      })

      setGames(games)
    }

    games()
  }, [])

  return (
    <div className="flex w-[80%] gap-6 mt-16">
      <AliceCarousel
        mouseTracking
        items={games}
        paddingRight={20}
        disableDotsControls
        touchMoveDefaultEvents
        controlsStrategy="alternate"
        responsive={responsive}
      />
    </div>
  )
}
