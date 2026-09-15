import { AlertDialog } from '#/components/ui/alert-dialog'
import { useDeleteStore } from '#/stores/delete-store'
import { Trash2Icon } from 'lucide-react'

const DeleteDialog = () => {
  const beingDeleted = useDeleteStore((state) => state.beingDeleted)
  const setBeingDeleted = useDeleteStore((state) => state.setBeingDeleted)

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
          <AlertDialog.Cancel variant="destructive">Delete</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteDialog
