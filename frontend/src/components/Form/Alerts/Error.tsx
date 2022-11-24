import { useState } from 'react'
import classNames from 'classnames'
import { Bug, X } from 'phosphor-react'

interface Props {
  message: any
}

export function Error({ message }: Props) {
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
          <div className="bg-[#ff0000] absolute h-24 w-3 rounded"></div>

          <div className="flex justify-self-end pl-4">
            <span className="bg-[#ff0000] text-white m-1 rounded-[50%] h-full">
              <Bug weight="thin" fontSize={20} />
            </span>

            <strong className="text-black m-[2px]">Error</strong>
          </div>

          <div className="text-black text-sm whitespace-normal w-full pl-6">
            <span>{message}</span>
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
