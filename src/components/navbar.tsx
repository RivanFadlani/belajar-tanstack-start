import { Button } from './ui/button'
import type React from 'react'

const NavbarRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto my-6 box-border flex w-full items-center justify-between rounded-2xl border-2 border-b-6 bg-zinc-100 p-4">
      {children}
    </div>
  )
}

const NavbarHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header>
      <h1 className="font-sans text-2xl font-medium tracking-wide uppercase">
        {children}
      </h1>
    </header>
  )
}

const NavbarNavigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav>
      <Button variant="default" className="size-12 sm:w-48 sm:px-4 sm:py-2">
        {children}
      </Button>
    </nav>
  )
}

export const Navbar = {
  Root: NavbarRoot,
  Header: NavbarHeader,
  Navigation: NavbarNavigation,
}
