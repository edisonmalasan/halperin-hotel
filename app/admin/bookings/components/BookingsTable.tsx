"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "@/components/ui/animated-modal";
import { toast } from "sonner";

export type Booking = {
  id: number;
  guest: string;
  room: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Booked" | "Checked-in" | "Checked-out" | "Cancelled";
};

const statusColors: Record<string, string> = {
  Booked: "bg-blue-500",
  "Checked-in": "bg-green-500",
  "Checked-out": "bg-gray-500",
  Cancelled: "bg-red-500",
};

// 12 hr frmat
function formatDateTime(dt: string | null) {
  if (!dt) return "-";
  let d;
  try {
    // if dt contains t and z dont add another z
    let isoString = dt.includes("T") ? dt : dt.replace(" ", "T");
    if (!isoString.endsWith("Z")) isoString += "Z";
    d = new Date(isoString);
    if (isNaN(d.getTime())) throw new Error("Invalid date");
  } catch {
    return "-";
  }
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });
}

export const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
    minSize: 32,
    maxSize: 32,
  },
  {
    accessorKey: "guest",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Guest
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("guest")}</span>,
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => <span>{row.getValue("room")}</span>,
  },
  {
    accessorKey: "booked",
    header: "Booked",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("booked"))}</span>,
  },
  {
    accessorKey: "checkIn",
    header: "Check-in",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("checkIn"))}</span>,
  },
  {
    accessorKey: "checkOut",
    header: "Check-out",
    cell: ({ row }) => <span>{formatDateTime(row.getValue("checkOut"))}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let status = row.getValue("status") as string;
      status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      let bgClass = statusColors[status] || "bg-gray-600";
      if (status.toLowerCase() === "booked") {
        bgClass = "bg-blue-500";
        status = "Booked";
      }
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${bgClass}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Edit: ${booking.guest}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Cancel: ${booking.guest}`)}>
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function BookingsTable({ data, onAction }: { data: Booking[]; onAction?: () => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [tableData, setTableData] = React.useState<Booking[]>(data);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [confirm, setConfirm] = React.useState<{
    open: boolean;
    ids: number[];
    action: "check-out" | "cancel" | null;
  }>({ open: false, ids: [], action: null });
  const [undoInfo, setUndoInfo] = React.useState<{
    id: number;
    prevStatus: string;
  } | null>(null);
  const [edit, setEdit] = React.useState<{
    open: boolean;
    booking: Booking | null;
  }>({ open: false, booking: null });

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  // filter by status
  const filteredData = React.useMemo(() => {
    if (!statusFilter) return tableData;
    return tableData.filter((b) => b.status === statusFilter);
  }, [tableData, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: React.useMemo(() => columnsWithActions(), [actionLoading]),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // PATCH booking status with undo for cancel
  const updateBookingStatus = async (
    ids: number[],
    action: "check-in" | "check-out" | "cancel",
    options?: { undoable?: boolean; prevStatus?: string }
  ) => {
    setActionLoading(true);
    try {
      await Promise.all(
        ids.map(async (id) => {
          const prev = tableData.find((b) => b.id === id);
          const res = await fetch("/api/book", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, action }),
          });
          if (!res.ok) throw new Error("Failed to update booking");
          const result = await res.json();
          if (!result.success) throw new Error(result.error || "Unknown error");
          setTableData((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...result.booking } : b))
          );
          if (onAction) onAction();
          // Undo support for cancel
          if (action === "cancel" && options?.undoable && prev) {
            setUndoInfo({ id, prevStatus: prev.status });
            toast("Booking cancelled", {
              action: {
                label: "Undo",
                onClick: async () => {
                  await updateBookingStatus(
                    [id],
                    prev.status === "Booked" ? "check-in" : "check-in",
                    { undoable: false }
                  );
                  setUndoInfo(null);
                  toast.success("Undo successful");
                },
              },
            });
          } else {
            toast.success(`Booking ${action.replace("-", " ")} successful`);
          }
        })
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking(s)");
    } finally {
      setActionLoading(false);
      setRowSelection({});
    }
  };

  // Add a function to handle deleting a booking
  const deleteBooking = async (id: number) => {
    try {
      const res = await fetch(`/api/book?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      setTableData((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
      if (onAction) onAction();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete booking");
    }
  };

  // BULK BTNS
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const handleBulkAction = (action: "check-in" | "check-out" | "delete") => {
    const ids = selectedRows.map((row) => row.original.id);
    if (ids.length === 0) return;
    if (action === "delete") {
      Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/book?id=${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete booking");
        })
      )
        .then(() => {
          setTableData((prev) => prev.filter((b) => !ids.includes(b.id)));
          toast.success("Bookings deleted");
          if (onAction) onAction();
        })
        .catch((err) => {
          toast.error(err.message || "Failed to delete bookings");
        });
    } else {
      updateBookingStatus(ids, action);
    }
  };

  function columnsWithActions(): ColumnDef<Booking>[] {
    return columns.map((col) => {
      if (col.id !== "actions") return col;
      return {
        ...col,
        cell: ({ row }) => {
          const booking = row.original;
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    disabled={actionLoading}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {booking.status === "Booked" && (
                    <DropdownMenuItem
                      onClick={() =>
                        updateBookingStatus([booking.id], "check-in")
                      }
                    >
                      Check-in
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => setEdit({ open: true, booking })}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setConfirm({
                        open: true,
                        ids: [booking.id],
                        action: "cancel",
                      })
                    }
                  >
                    Cancel
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => deleteBooking(booking.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      };
    });
  }

  // confirmation modal
  const ConfirmModal = () => (
    <Modal>
      {confirm.open && (
        <ModalBody>
          <ModalContent>
            <div className="text-lg font-semibold mb-4">
              Confirm {confirm.action?.replace("-", " ")}
            </div>
            <div>
              Are you sure you want to {confirm.action?.replace("-", " ")}{" "}
              {confirm.ids.length} booking(s)?
            </div>
          </ModalContent>
          <ModalFooter>
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded mr-2"
              onClick={() => setConfirm({ open: false, ids: [], action: null })}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={async () => {
                setConfirm({ open: false, ids: [], action: null });
                await updateBookingStatus(confirm.ids, confirm.action!, {
                  undoable: confirm.action === "cancel",
                });
              }}
            >
              Confirm
            </button>
          </ModalFooter>
        </ModalBody>
      )}
    </Modal>
  );

  // Eedit modal
  const EditModal = () => {
    const { open, booking } = edit;
    const [guest, setGuest] = React.useState(booking?.guest || "");
    const [status, setStatus] = React.useState(booking?.status || "Booked");
    React.useEffect(() => {
      setGuest(booking?.guest || "");
      setStatus(booking?.status || "Booked");
    }, [booking]);
    if (!open || !booking) return null;
    return (
      <Modal
        open={open}
        setOpen={(val) => {
          if (!val) setEdit({ open: false, booking: null });
        }}
      >
        <ModalBody>
          <ModalContent className="text-black">
            <div className="text-lg font-semibold mb-4 text-black">
              Edit Booking
            </div>
            <div className="mb-2">
              <label className="block mb-1 ">Guest Name</label>
              <input
                className="w-full px-3 py-2 rounded border"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 rounded border"
                value={status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value as Booking["status"])
                }
              >
                <option value="Booked">Booked</option>
                <option value="Checked-in">Checked-in</option>
                <option value="Checked-out" disabled={!booking.checkIn}>
                  Checked-out
                </option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </ModalContent>
          <ModalFooter>
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded mr-2"
              onClick={() => setEdit({ open: false, booking: null })}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={async () => {
                setEdit({ open: false, booking: null });
                try {
                  const res = await fetch("/api/book", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: booking.id, guest, status }),
                  });
                  if (!res.ok) throw new Error("Failed to update booking");
                  const result = await res.json();
                  if (!result.success)
                    throw new Error(result.error || "Unknown error");
                  setTableData((prev) =>
                    prev.map((b) =>
                      b.id === booking.id ? { ...b, ...result.booking } : b
                    )
                  );
                  toast.success("Booking updated");
                  if (onAction) onAction();
                } catch (err: any) {
                  toast.error(err.message || "Failed to update booking");
                }
              }}
            >
              Save
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" richColors />
      <ConfirmModal />
      <EditModal />
      {/* Bulk Actions & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 py-4">
        <div className="flex gap-2 mb-2 md:mb-0">
          <Button
            variant="default"
            disabled={selectedRows.length === 0 || actionLoading}
            onClick={() => handleBulkAction("check-in")}
          >
            {actionLoading ? "Processing..." : "Bulk Check-in"}
          </Button>
          <Button
            variant="secondary"
            disabled={selectedRows.length === 0 || actionLoading}
            onClick={() => handleBulkAction("check-out")}
          >
            {actionLoading ? "Processing..." : "Bulk Check-out"}
          </Button>
          <Button
            variant="destructive"
            disabled={selectedRows.length === 0 || actionLoading}
            onClick={() => handleBulkAction("delete")}
          >
            {actionLoading ? "Processing..." : "Bulk Delete"}
          </Button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Input
            placeholder="Filter guest..."
            value={(table.getColumn("guest")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("guest")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            disabled={actionLoading}
          />
          <select
            className="rounded-lg px-4 py-2 text-black bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={actionLoading}
          >
            <option value="">All Statuses</option>
            <option value="Booked">Booked</option>
            <option value="Checked-in">Checked-in</option>
            <option value="Checked-out">Checked-out</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-black"
                disabled={actionLoading}
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border bg-[#232334]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.getIsSelected()
                      ? "bg-white/80 text-black transition"
                      : "hover:bg-[#232334]/60 transition"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        row.getIsSelected() ? "text-black" : "text-white"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 text-black">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || actionLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || actionLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
