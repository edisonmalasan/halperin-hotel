"use client";

import React, { useState } from "react";
import {
  ModalProvider,
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FacilitiesTable, Facility } from "./components/FacilitiesTable";

export default function FacilitiesPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // Placeholder for form state
  const [form, setForm] = useState({
    type: "room",
    name: "",
    description: "",
    price: "",
    status: "available",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: add backend
    setModalOpen(false);
  };

  // Placeholder data for facilities
  const facilities: Facility[] = [
    {
      id: 1,
      type: "Room",
      name: "Deluxe-101",
      price: 2500,
      status: "Available",
    },
    { id: 2, type: "Suite", name: "Junior-2", price: 4000, status: "Occupied" },
    { id: 3, type: "Dining", name: "Table 3", price: 500, status: "Booked" },
    {
      id: 4,
      type: "Event",
      name: "Wedding-1",
      price: 8000,
      status: "Available",
    },
  ];

  return (
    <ModalProvider>
      <div className="h-full p-8 bg-[#181828]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex gap-2">
            {/* Type Filter */}
            <select className="border rounded px-3 py-2 bg-[#232334] text-white">
              <option value="">All Types</option>
              <option value="room">Room</option>
              <option value="suite">Suite</option>
              <option value="dining">Dining</option>
              <option value="event">Event</option>
            </select>
            {/* Status Filter */}
            <select className="border rounded px-3 py-2 bg-[#232334] text-white">
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name or number..."
            className="border rounded px-3 py-2 bg-[#232334] text-white w-full md:w-64"
          />
          {/* Add Facility Button */}
          <Modal open={modalOpen} setOpen={setModalOpen}>
            <ModalTrigger className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#6366F1] transition">
              + Add Facility
            </ModalTrigger>
            <ModalBody>
              <form onSubmit={handleSubmit} className="w-full">
                <ModalContent>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={(e) =>
                        handleSelectChange("type", e.target.value)
                      }
                      className="border rounded px-3 py-2 bg-[#232334] text-white w-full"
                    >
                      <option value="room">Room</option>
                      <option value="suite">Suite</option>
                      <option value="dining">Dining</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Name / Number
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Deluxe-101, Table 3, Wedding-1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Facility description..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Price
                    </label>
                    <Input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="₱0"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={(e) =>
                        handleSelectChange("status", e.target.value)
                      }
                      className="border rounded px-3 py-2 bg-[#232334] text-white w-full"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="booked">Booked</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-200">
                      Image (optional)
                    </label>
                    <Input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </ModalContent>
                <ModalFooter>
                  <Button
                    type="submit"
                    className="bg-[#4F46E5] text-white px-4 py-2 rounded hover:bg-[#6366F1] transition"
                  >
                    {isEdit ? "Save Changes" : "Add Facility"}
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </Modal>
        </div>
        {/* Table */}
        <FacilitiesTable data={facilities} />
      </div>
    </ModalProvider>
  );
}
