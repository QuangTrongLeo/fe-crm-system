"use client";

import type { CustomerResponseFormData } from "@/schema/customer.schema";
import {
  MoreHorizontal,
  MessageSquarePlus,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ContactsTableProps {
  customers: CustomerResponseFormData[];
  onSelectUser: (id: number) => void;
  onQuickNote: (id: number) => void;
}

export function ContactsTable({
  customers,
  onSelectUser,
  onQuickNote,
}: ContactsTableProps) {
  const columns: ColumnDef<CustomerResponseFormData>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {customer.firstName} {customer.lastName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              {customer.company}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "Email",
      header: "Email",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              {customer.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
              {customer.phone}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const getStatusStyles = (status: string) => {
          switch (status.toUpperCase()) {
            case "ACTIVE":
              return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
            case "LEAD":
              return "bg-amber-500/10 text-amber-600 border-amber-500/20";
            case "INACTIVE":
              return "bg-rose-500/10 text-rose-600 border-rose-500/20";
            default:
              return "bg-blue-500/10 text-blue-600 border-blue-500/20";
          }
        };

        return (
          <Badge
            variant="outline"
            className={`font-medium capitalize ${getStatusStyles(status)}`}
          >
            {status.toLowerCase()}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <div
            className="flex items-center justify-end gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => onQuickNote(customer.id)}
            >
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onSelectUser(customer.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onQuickNote(customer.id)}>
                  Add Note
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent border-b"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-4 font-semibold text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group cursor-pointer hover:bg-muted/40 transition-all duration-200"
                onClick={() => onSelectUser(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="text-lg font-medium">No Customers found</p>
                  <p className="text-sm">
                    Start by adding a new customer to your list.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
