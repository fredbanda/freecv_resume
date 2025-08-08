'use client'

import Link from 'next/link'
import Logo from '../../../assets/logo.png'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import ThemeToggle from '../ThemeToggle'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  return (
    <header className="shadow-lg bg-gray-300 dark:bg-gray-900">
      <div className="max-w-7xl relative mx-auto p-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/resumes" className="flex items-center gap-2 z-10">
          <Image
            src={Logo}
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            FreeCVResumes
          </span>
        </Link>

        {/* Center: Nav Links */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <Link
            href="/resumes"
            className={`text-sm font-semibold hover:underline ${pathname === '/resumes' ? 'underline' : ''}`}
          >
            My Resumes
          </Link>
          <Link
            href="/editor"
            className={`text-sm font-semibold hover:underline ${pathname === '/editor' ? 'underline' : ''}`}
          >
            Editor
          </Link>
          <Link
            href="/jobs"
            className={`text-sm font-semibold hover:underline ${pathname === '/' ? 'underline' : ''}`}
          >
            Job Openings
          </Link>
        </nav>

        {/* Right: User Button & Theme Toggle */}
        <div className="flex items-center gap-3 z-10">
          <UserButton
            appearance={{
              baseTheme: theme === 'dark' ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 30,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
