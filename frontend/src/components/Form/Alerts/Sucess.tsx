import { useState } from 'react'
import classNames from 'classnames'
import { Check, X } from 'phosphor-react'

export function Sucess() {
  const [clickBackButton, setClickBackButton] = useState<boolean>(false)

  return (
    <>
      <div
        className={classNames('rounded bg-white absolute right-0 top-0 w-[50%] h-24', {
          flex: !clickBackButton,
          hidden: clickBackButton,
        })}
      >
        <div className="w-full">
          <div className="bg-green-500 absolute h-24 w-3 rounded"></div>

          <div className="flex justify-self-end pl-4">
            <span className="bg-green-500 text-white m-1 rounded-[50%] h-full">
              <Check weight="thin" fontSize={20} />
            </span>

            <strong className="text-black m-[2px]">Secess</strong>
          </div>

          <div className="text-black text-sm whitespace-normal w-full pl-6 pt-2">
            <span>Anúncio criado com sucesso :)</span>
          </div>
        </div>

        <div className="right-0 top-0 text-black">
          <button type="button" onClick={() => setClickBackButton(true)}>
            <X weight="thin" fontSize={25} />
          </button>
        </div>
      </div>
    </>
  )
}
