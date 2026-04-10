import { type CustomerResponseFormData } from "@/schema/customer.schema";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  update_customer,
  get_all_customer,
} from "@/services/api/customer.service";
import { useCustomerStore } from "@/store/useCustomerStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerStatus } from "@/lib/enum";
import { InfoItem } from "./InfoItem";
import {
  Building2,
  Mail,
  Phone,
  Check,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UpdateFormProps {
  customer: CustomerResponseFormData;
  isEditing: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export const UpdateForm = ({
  customer,
  isEditing,
  onCancel,
  onSuccess,
}: UpdateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CustomerResponseFormData>(customer);
  const { setCustomers, setSelectCustomer } = useCustomerStore();

  const isStatusActive = formData.status === "ACTIVE";

  useEffect(() => {
    setFormData(customer);
  }, [customer, isEditing]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedCustomer = await update_customer(
        customer.id.toString(),
        formData,
      );

      const allCustomers = await get_all_customer();
      setCustomers(allCustomers);
      setSelectCustomer(updatedCustomer);

      onSuccess();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {isEditing ? (
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="h-8 text-sm font-bold bg-background/50 border-input shadow-none focus-visible:ring-1 focus-visible:ring-blue-500/20"
              placeholder="First Name"
            />
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="h-8 text-sm font-bold bg-background/50 border-input shadow-none focus-visible:ring-1 focus-visible:ring-blue-500/20"
              placeholder="Last Name"
            />
          </div>
        ) : (
          <h2 className="text-xl font-black tracking-tight text-foreground truncate">
            {formData.firstName} {formData.lastName}
          </h2>
        )}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData({ ...formData, status: val })}
            >
              <SelectTrigger className="w-[110px] h-6 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-black border bg-background/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CustomerStatus).map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-black border",
                isStatusActive
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
              )}
            >
              {formData.status}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            ID: #{customer.id}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        {isEditing ? (
          <>
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
                Company
              </label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="h-8 text-xs font-bold bg-background/50 border-input shadow-none focus-visible:ring-1 focus-visible:ring-blue-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-8 text-xs font-bold bg-background/50 border-input shadow-none focus-visible:ring-1 focus-visible:ring-blue-500/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
                Phone
              </label>
              <Input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="h-8 text-xs font-bold bg-background/50 border-input shadow-none focus-visible:ring-1 focus-visible:ring-blue-500/20"
              />
            </div>
          </>
        ) : (
          <>
            <InfoItem
              icon={Building2}
              label="Company"
              value={formData.company}
            />
            <InfoItem icon={Mail} label="Email" value={formData.email} />
            <InfoItem icon={Phone} label="Phone" value={formData.phone} />
          </>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2 pt-4 border-t border-border/50">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 h-auto bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )}
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
