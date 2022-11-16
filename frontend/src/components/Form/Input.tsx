import { InputHTMLAttributes } from 'react'

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: PropsInput) {
  return (
    <input {...props} className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" />
  )
}
