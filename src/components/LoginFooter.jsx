import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeLanguage } from '../utils/configSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

const FOOTER_LINKS = [
  ['FAQ', 'Cookie Preferences'],
  ['Help Centre', 'Corporate Information'],
  ['Terms of Use'],
  ['Privacy'],
]

const LoginFooter = () => {
  const lang = useSelector((store) => store.config?.lang ?? 'en')
  const dispatch = useDispatch()

  return (
    <footer className="mt-auto w-full bg-black border-t border-white/10 py-8 px-4 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-white/90 text-sm mb-6">
          Questions? Call{' '}
          <a href="tel:000-800-919-1743" className="underline hover:no-underline">
            000-800-919-1743 (Toll-Free)
          </a>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {FOOTER_LINKS.map((column, i) => (
            <ul key={i} className="flex flex-col gap-3">
              {column.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Select value={lang} onValueChange={(value) => dispatch(changeLanguage(value))}>
            <SelectTrigger className="w-[140px] h-10 bg-zinc-900 border-gray-700 text-gray-300 rounded">
              <Globe className="size-4 text-gray-400" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-gray-700">
              {SUPPORTED_LANGUAGES.map((item) => (
                <SelectItem
                  key={item.identifier}
                  value={item.identifier}
                  className="text-white focus:bg-zinc-800 focus:text-white"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  )
}

export default LoginFooter
