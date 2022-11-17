import { IPropsGameBanner } from '../../interfaces/PropsGameBanner'

export function GameBanner({ adsCount, bannerUrl, title }: IPropsGameBanner) {
  const pluralAds = adsCount <= 1 ? 'anúncio' : 'anúncios'

  return (
    <>
      <a href={bannerUrl} className="relative rounded-lg overflow-hidden">
        <img src={bannerUrl} alt="" />

        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
          <strong className="font-bold text-white block">{title}</strong>
          <span className="text-zinc-300 text-sm block">
            {adsCount} {pluralAds}
          </span>
        </div>
      </a>
    </>
  )
}
