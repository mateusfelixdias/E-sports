import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../assets/logo-nlw-esports.svg'
import { Carrossel } from '../components/Carrossel/Carrossel'
import { CreateAdModal } from '../components/Modal/CreateAdModal'
import { CreateAdBanner } from '../components/Banner/CreateAdBanner'

export function App() {
  return (
    <div className="w-full mx-auto flex flex-col items-center my-10">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20 target:w-full table:text-4xl">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui!
      </h1>

      <Carrossel />

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
