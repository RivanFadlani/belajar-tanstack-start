import { AlertDialog } from '#/components/ui/alert-dialog'
import { deleteNoteSchema } from '#/schemas/note-schema'
import { useDeleteStore } from '#/stores/delete-store'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { Trash2Icon } from 'lucide-react'
import { useTransition } from 'react'
import { Spinner } from './ui/spinner'
import { toast } from './ui/toast'
import { notesTable } from '#/db/schema'
import { and, eq } from 'drizzle-orm'
import { redirect, useRouter } from '@tanstack/react-router'
import { authMiddleware } from '#/middlewares/auth-middleware'
import { db } from '#/index'

const deleteNote = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(deleteNoteSchema)
  .handler(async ({ data, context }) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    // throw new Error('haha')
    const { user } = context

    await db
      .delete(notesTable)
      .where(and(eq(notesTable.id, data.id), eq(notesTable.userId, user.id)))

    throw redirect({
      to: '/',
    })
  })

const DeleteDialog = () => {
  const deleteNoteFn = useServerFn(deleteNote)

  const beingDeleted = useDeleteStore((state) => state.beingDeleted)
  const setBeingDeleted = useDeleteStore((state) => state.setBeingDeleted)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (!beingDeleted?.id) return

    startTransition(async () => {
      try {
        await deleteNoteFn({
          data: {
            id: beingDeleted?.id,
          },
        })
        toast.add({
          type: 'success',
          description: `'${beingDeleted.title}' deleted`,
        })
        router.invalidate() // sinkron data setelah mutasi data (delete note), sampai ke route '/'
      } catch (error) {
        toast.add({
          type: 'error',
          title: 'Error',
          description: `Failed to delete '${beingDeleted.title}', please try again!`,
          priority: 'high',
        })
      } finally {
        setBeingDeleted(null)
      }
    })
  }

  return (
    <AlertDialog.Root
      open={!!beingDeleted}
      onOpenChange={() => setBeingDeleted(null)}
    >
      <AlertDialog.Content size="sm" className="border-3 border-zinc-100">
        <AlertDialog.Header>
          <AlertDialog.Media className="bg-[#ff4b4b] text-white">
            <Trash2Icon />
          </AlertDialog.Media>
          <AlertDialog.Title>Delete Note</AlertDialog.Title>
          <AlertDialog.Description>
            Do you want to delete <strong>'{beingDeleted?.title}'</strong>?
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer className="border-t-3 border-t-zinc-100 pt-4">
          <AlertDialog.Cancel variant="outline">Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="destructive" onClick={handleDelete}>
            {isPending ? (
              <>
                <Spinner data-icon="inline-start" />
                <span>Deleting</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteDialog
