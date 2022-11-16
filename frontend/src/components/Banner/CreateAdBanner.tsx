import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden mx-16">
      <div className="bg-[#2A2634] px-8 py-8 flex justify-between items-center table:flex-col">
        <div className="table:pb-4">
          <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 flex items-center gap-3 hover:bg-violet-600 rounded text-white transition-colors">
          <MagnifyingGlassPlus size={20} />
          Publique um anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
