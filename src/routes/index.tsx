import Main from '#/components/layout/main'
import { Navbar } from '#/components/navbar'
import { Button } from '#/components/ui/button'
import { DropdownMenu } from '#/components/ui/dropdown-menu'
import { Item } from '#/components/ui/item'
import { Separator } from '#/components/ui/separator'
import { useDeleteStore } from '#/stores/delete-store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { EllipsisVertical, Eye, Pencil, Plus, Trash2Icon } from 'lucide-react'
import { db } from '..'
import { createServerFn } from '@tanstack/react-start'

const getNotes = createServerFn({ method: 'GET' }).handler(async () => {
  const notes = await db.query.notesTable.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return notes
})

export const Route = createFileRoute('/')({
  component: Home,
  // loader = dieksekusi di dua environtment. client dan server
  loader: async () => {
    const notes = await getNotes()
    return { notes }
  },
})

function Home() {
  const setBeingDeleted = useDeleteStore((state) => state.setBeingDeleted)
  const { notes } = Route.useLoaderData()

  return (
    <>
      <Navbar.Root>
        <Navbar.Header>Ripunn Notes</Navbar.Header>
        <Navbar.Navigation>
          <Button
            variant="default"
            nativeButton={false}
            render={
              <Link to="/create">
                <Plus /> <span className="hidden sm:inline">Create Note</span>
              </Link>
            }
            className="size-12 sm:w-48 sm:px-4 sm:py-2"
          />
        </Navbar.Navigation>
      </Navbar.Root>

      <Main>
        <Separator className="mb-4" />

        <h1 className="mx-4 mb-4 font-sans text-xl font-medium uppercase">
          Note Lists
        </h1>

        <div className="grid grid-cols-1 gap-3">
          {notes.map((note) => (
            <Item.Root
              key={note.id}
              variant="outline"
              className="mx-auto w-full"
            >
              <Item.Content>
                <Item.Title>{note.title}</Item.Title>
                <Item.Description>{note.note}</Item.Description>
              </Item.Content>
              <Item.Actions>
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={
                    <Link
                      to="/view/$noteId"
                      params={{ noteId: note.id.toString() }}
                    >
                      <Eye />
                      View
                    </Link>
                  }
                ></Button>
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
                        <DropdownMenu.Item
                          render={
                            <Link
                              to="/edit/$noteId"
                              params={{ noteId: note.id.toString() }}
                            >
                              <Pencil /> Edit
                            </Link>
                          }
                        ></DropdownMenu.Item>
                        <DropdownMenu.Item
                          variant="destructive"
                          onClick={() =>
                            setBeingDeleted({
                              id: note.id.toString(),
                              title: note.title,
                            })
                          }
                        >
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
      </Main>
    </>
  )
}
