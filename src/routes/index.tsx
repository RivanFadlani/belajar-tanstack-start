import Navbar from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { DropdownMenu } from '#/components/ui/dropdown-menu'
import { Item } from '#/components/ui/item'
import { Separator } from '#/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { EllipsisVertical, Eye, Pencil, Trash2Icon } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

const notes = [
  {
    id: 1234,
    title: 'Belajar Tanstack Start',
    description:
      "Hari ini aku belajar 'Tanstack Start'. Tapi tidak hanya itu, aku juga belajar Design Pattern yaitu 'Compound Component' menggunakan shadcn/ui",
  },
  {
    id: 1235,
    title: 'Belajar NextJS',
    description:
      "Hari ini aku belajar 'NextJS'. Tapi tidak hanya itu, aku juga belajar menggunakan shadcn/ui untuk mempercepat merancang UI",
  },
  {
    id: 1236,
    title: 'Belajar TypeScript',
    description:
      "Hari ini aku belajar 'TypeScript'. Tapi tidak hanya itu, aku juga belajar Zod untuk melakukan validasi pada saat runtime",
  },
]

function Home() {
  return (
    <div className="container mx-auto flex flex-col justify-center">
      <Navbar />

      <main className="px-4">
        <Separator className="mb-4" />

        <h1 className="mx-4 mb-4 font-sans text-xl font-medium uppercase">
          Note Lists
        </h1>

        <div className="grid grid-cols-1 gap-3">
          {notes.map((note) => (
            <Item.Root variant="outline" className="mx-auto w-full">
              <Item.Content key={note.id}>
                <Item.Title>{note.title}</Item.Title>
                <Item.Description>{note.description}</Item.Description>
              </Item.Content>
              <Item.Actions>
                <Button variant="outline" size="sm">
                  <Eye />
                  View
                </Button>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    render={
                      <Button size="icon-sm" variant="outline">
                        <EllipsisVertical />
                      </Button>
                    }
                  />
                  <DropdownMenu.Content align="center" sideOffset={10}>
                    <menu>
                      <DropdownMenu.Group>
                        <DropdownMenu.Label>Actions</DropdownMenu.Label>
                        <DropdownMenu.Item>
                          <Pencil /> Edit
                        </DropdownMenu.Item>
                        <DropdownMenu.Item variant="destructive">
                          <Trash2Icon /> Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Group>
                    </menu>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Item.Actions>
            </Item.Root>
          ))}
        </div>
      </main>
    </div>
  )
}
