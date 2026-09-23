import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { InputGroup } from '#/components/ui/input-group'
import type React from 'react'
import { Label } from '#/components/ui/label'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

const NoteSearch = () => {
  const search = useSearch({ from: '/_authed/' }) // sama seperti Route.useSearch()
  const navigate = useNavigate()

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const searchQuery = (formData.get('search') as string) || undefined

    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        q: searchQuery,
      }),
    })
  }

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <InputGroup.Root className="rounded-2xl border-2 px-2 py-6">
        <InputGroup.Input
          name="search"
          placeholder="Search..."
          className="ml-2 placeholder:text-zinc-400"
        />
        <InputGroup.Addon>
          <Search />
        </InputGroup.Addon>
        <InputGroup.Addon align="inline-end">
          <Button variant="outline" size="sm" type="submit" className="h-7">
            Search
          </Button>
        </InputGroup.Addon>
      </InputGroup.Root>
      {search.q && (
        <Label className="mt-2 text-zinc-400">
          Searching for: '{search.q}'.{' '}
          <Link to="/" search={{ q: undefined }} className="underline">
            Clear Search
          </Link>
        </Label>
      )}
    </form>
  )
}

export default NoteSearch
