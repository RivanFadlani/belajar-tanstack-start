import type React from 'react'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="px-4">{children}</main>
    </>
  )
}

export default Main
