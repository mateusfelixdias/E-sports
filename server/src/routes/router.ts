import { Router } from 'express'
import { getGames } from '../api/get-games'
import { create } from '../api/create-games-id-ads'
import { adsIdDiscord } from '../api/ads-id-discord'
import { getGamesIds } from '../api/get-games-id-ads'

const routes = Router()

routes.post('/games/:id/ads', create)

routes.get('/games', getGames)

routes.get('/games/:id/ads', getGamesIds)

routes.get('/ads/:id/discord', adsIdDiscord)

export { routes }
