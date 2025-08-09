'use client'

import Link from 'next/link'
import Logo from '../../../assets/logo.png'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { CreditCard, Menu, X } from 'lucide-react'
import ThemeToggle from '../ThemeToggle'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="shadow-lg bg-gray-300 dark:bg-gray-900">
      <div className="max-w-7xl relative mx-auto p-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/resumes" className="flex items-center gap-2 z-20">
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

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6">
          <Link
            href="/resumes"
            className={`text-sm font-semibold hover:underline ${
              pathname === '/resumes' ? 'underline' : ''
            }`}
          >
            My Resumes
          </Link>
          <Link
            href="/editor"
            className={`text-sm font-semibold hover:underline ${
              pathname === '/editor' ? 'underline' : ''
            }`}
          >
            Editor
          </Link>
          <Link
            href="/jobs"
            className={`text-sm font-semibold hover:underline ${
              pathname === '/jobs' ? 'underline' : ''
            }`}
          >
            Job Openings
          </Link>
        </nav>

        {/* Right: User Button, Theme Toggle, and Mobile Menu Button */}
        <div className="flex items-center gap-3 z-20">
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-300 dark:bg-gray-900 shadow-lg z-100">
            <nav className="flex flex-col items-center gap-4 p-4">
              <Link
                href="/resumes"
                className={`text-sm dark:text-white text-gray-900 font-semibold hover:underline ${
                  pathname === '/resumes' ? 'underline' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Resumes
              </Link>
              <Link
                href="/editor"
                className={`text-sm dark:text-white text-gray-900 font-semibold hover:underline ${
                  pathname === '/editor' ? 'underline' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Editor
              </Link>
              <Link
                href="/jobs"
                className={`text-sm dark:text-white text-gray-900 font-semibold hover:underline ${
                  pathname === '/jobs' ? 'underline' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Job Openings
              </Link>
              <div className="flex items-center gap-3 mt-4">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}