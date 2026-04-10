import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  get_all_customer,
  delete_customer,
} from "@/services/api/customer.service";
import { useCustomerStore } from "@/store/useCustomerStore";

interface DeleteAlterProps {
  userId: string;
  isEditing: boolean;
  onEdit: () => void;
  onClose: () => void;
}

export const DeleteAlter = ({
  userId,
  isEditing,
  onEdit,
  onClose,
}: DeleteAlterProps) => {
  const { setCustomers, setSelectCustomer } = useCustomerStore();

  const handleDelete = async () => {
    await delete_customer(userId);

    const allCustomers = await get_all_customer();
    setCustomers(allCustomers);
    setSelectCustomer(null);
    onClose();
  };

  // hide buttons while editing
  if (isEditing) return null;

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={onEdit}
        className="w-full h-auto flex items-center justify-center gap-2 py-3 bg-white text-blue-600 border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/5 group active:scale-[0.98]"
      >
        <Edit2 className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        Edit Profile
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full h-auto flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-100 transition-all active:scale-[0.98]">
            <Trash className="w-3.5 h-3.5" />
            Delete Customer
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black tracking-tight">
              Delete Customer?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-medium text-slate-500">
              This action cannot be undone. All data associated with this
              customer will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t gap-3">
            <AlertDialogCancel className="h-auto px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 border-none transition-all">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-auto px-6 py-2.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-700 transition-all"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
