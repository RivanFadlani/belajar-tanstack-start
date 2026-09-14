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
  return <nav>{children}</nav>
}

export const Navbar = {
  Root: NavbarRoot,
  Header: NavbarHeader,
  Navigation: NavbarNavigation,
}
