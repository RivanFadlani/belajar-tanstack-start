import { Plus } from 'lucide-react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className="mx-auto my-6 box-border flex w-xs items-center justify-between rounded-2xl border-2 border-b-6 bg-zinc-100 p-4 sm:w-full">
      <header>
        <h1 className="font-sans text-2xl font-medium tracking-wide uppercase">
          Ripunn Note
        </h1>
      </header>

      <nav>
        <Button variant="default" className="size-12 sm:w-48 sm:px-4 sm:py-2">
          <Plus /> <span className="hidden sm:inline">Create Note</span>
        </Button>
      </nav>
    </div>
  )
}

export default Navbar
