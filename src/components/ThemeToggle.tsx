'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { Badge } from './ui/badge'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch on SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
  <Badge onClick={toggleTheme} className="h-[28px] min-w-[28px] rounded-full px-1 font-mono tabular-nums ">
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="size-[1.2rem] absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Badge>
  )
}
