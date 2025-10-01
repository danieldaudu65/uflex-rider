import React from "react";
import { useNavigate } from "react-router-dom";
import { bell, userLogin } from "../assets";
import Search from "../components/Search";

const Bookings: React.FC = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      id: "B001",
      from: "Lagos",
      to: "Abuja",
      date: "2025-09-28",
      time: "10:30 AM",
      vehicle: "Toyota Corolla",
      status: "Completed",
      payment: "Paid",
      rider: "John Doe",
    },
    {
      id: "B002",
      from: "Kano",
      to: "Ibadan",
      date: "2025-09-29",
      time: "02:00 PM",
      vehicle: "Honda Civic",
      status: "Pending",
      payment: "Unpaid",
      rider: "Not Assigned",
    },
  ];

  return (
    <div className="p-6 bg-white h-full space-y-6 slim-scrollbar w-full">
      {/* Header */}
      <div className="flex relative justify-center items-center">
        <h1 className="font-extrabold text-lg">My Bookings</h1>
        <div className="flex gap-2 absolute right-1 justify-end">
          <img src={bell} alt="Notifications" />
          <img src={userLogin} alt="User" />
        </div>
      </div>

      <Search />

      {/* Booking List */}
      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => navigate(`/dashboard/bookings/books`)}
            className="border rounded-md border-gray-200 p-3 text-sm gap-2 shadow-sm cursor-pointer hover:bg-gray-50 transition"
          >
            <p className="flex justify-between">
              <span className="font-medium">Booking ID:</span> {booking.id}
            </p>
            <p className="flex justify-between">
              <span className="font-medium">From - To:</span>{" "}
              {booking.from} - {booking.to}
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
                {booking.payment}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Assigned Rider:</span>{" "}
              {booking.rider}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
