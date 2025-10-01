import React, { useState } from "react";
import { bell, userLogin } from "../assets";
import Search from "../components/Search";
import { FaChevronDown } from "react-icons/fa";

// Rider details
export type Rider = {
  id: string;
  name: string;
  phone?: string;
  vehicle?: string;
};

// The person who booked
export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  totalBookings?: number;
};

// The booking itself
export type Booking = {
  id: string;
  fromLocation: string;
  toLocation: string;
  date: string;
  time: string;
  vehicle: string;
  status: string;
  paymentStatus: string;
  customer: Customer;
  rider?: Rider; // optional
};

const BookingPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Hardcoded booking data (for frontend only)
  const booking: Booking = {
    id: "B001",
    fromLocation: "Lagos",
    toLocation: "Abuja",
    date: "2025-09-28",
    time: "10:30 AM",
    vehicle: "Toyota Corolla",
    status: "Completed",
    paymentStatus: "Paid",
    customer: {
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+2348012345678",
      totalBookings: 5,
    },
    rider: {
      id: "R001",
      name: "Michael Rider",
      phone: "+2348098765432",
      vehicle: "Honda Civic",
    },
  };

  return (
    <div className="p-6 bg-white h-full space-y-6 slim-scrollbar w-full">
      {/* Header */}
      <div className="flex relative justify-center items-center">
        <h1 className="font-extrabold text-lg">Booking</h1>
        <div className="flex gap-2 absolute right-1 justify-end">
          <img src={bell} alt="Notifications" />
          <img src={userLogin} alt="User" />
        </div>
      </div>

      <Search />

      {/* User (Booker) Card */}
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-bold">{booking.customer.name}</h2>
        <p className="text-gray-600">{booking.customer.email ?? "No email"}</p>

        <div className="mt-3 space-y-1 text-sm">
          <p className="flex justify-between">
            <span className="font-medium">Phone Number:</span>{" "}
            {booking.customer.phone}
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Total Bookings:</span>{" "}
            {booking.customer.totalBookings ?? 1}
          </p>
        </div>

        {/* Booking Details Section */}
        <div className="mt-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <h3 className="font-semibold">Booking Details</h3>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              open ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-3">
              <div className="border rounded-md border-gray-200 p-3 text-sm shadow-sm">
                <p className="flex justify-between">
                  <span className="font-medium">Booking ID:</span> {booking.id}
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">From - To:</span>{" "}
                  {booking.fromLocation} - {booking.toLocation}
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Date:</span> {booking.date}
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Time:</span> {booking.time}
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Vehicle:</span> {booking.vehicle}
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 font-medium">
                    {booking.status}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Payment:</span>
                  <span className="text-green-600 font-medium">
                    {booking.paymentStatus}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Assigned Rider:</span>{" "}
                  {booking.rider ? booking.rider.name : "Not Assigned"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
