import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bell, userLogin } from "../assets";
import Search from "../components/Search";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  vehicle: string;
  status: string;
  payment: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/rider_booking/my_bookings", "GET");

      if (response.data) setBookings(response.data);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      toast.error(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              onClick={() => navigate(`/dashboard/bookings/books/${booking._id}`)}
              className="border rounded-md border-gray-200 p-3 text-sm gap-2 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="flex justify-between">
                <span className="font-medium">Booking ID:</span> {booking._id}
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
                <span
                  className={`font-medium ${booking.status === "Completed" ? "text-green-600" : "text-orange-600"
                    }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Payment:</span>
                <span
                  className={`font-medium ${booking.payment === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {booking.payment}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
