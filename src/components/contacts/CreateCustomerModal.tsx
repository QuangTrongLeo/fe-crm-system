import { useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { useCustomerStore } from "../../store/useCustomerStore";
import {
  create_new_customer,
  get_all_customer,
  check_email_customer,
} from "@/services/api/customer.service";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CreateCustomerModal({
  onClose,
  assignedUserId,
}: {
  onClose: () => void;
  assignedUserId: number;
}) {
  const setCustomers = useCustomerStore((state) => state.setCustomers);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    status: "ACTIVE",
  });

  const checkEmail = async () => {
    if (!formData.email) return;
    const checked = await check_email_customer(formData.email);
    if (checked) {
      setIsEmailExist(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;

    setIsLoading(true);
    try {
      const data = {
        userId: assignedUserId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        status: formData.status,
      };
      await create_new_customer(data);
      const allCustomers = await get_all_customer();
      setCustomers(allCustomers);
      onClose();
    } catch (error) {
      console.error("Failed to create customer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b flex justify-between items-center bg-muted/30">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Create New Customer
          </h3>
          <Button
            onClick={onClose}
            className="p-1 w-8 h-8 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>
        <div className="p-6 bg-background">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium tracking-wide">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium tracking-wide">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium tracking-wide">
                Email <span className="text-red-500">*</span>
              </Label>
              {isEmailExist && (
                <p className="text-red-500 text-sm">Email already exists</p>
              )}
              <Input
                required
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onBlur={checkEmail}
                className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium tracking-wide">
                  Phone
                </Label>
                <Input
                  type="text"
                  placeholder="+84 123 456 789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium tracking-wide">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(e) => setFormData({ ...formData, status: e })}
                >
                  <SelectTrigger className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="LEAD">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium tracking-wide">
                Company
              </Label>
              <Input
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-3 py-2 border bg-secondary/50 rounded-xl focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all text-foreground"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
              <Button
                disabled={isLoading}
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-xl text-sm font-medium hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 shadow-sm flex items-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Customer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
