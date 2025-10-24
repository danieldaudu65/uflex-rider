import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bell, userLogin } from "../assets";
import Search from "../components/Search";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";


interface Booking {
  _id: string;
  pickupLocation: string;
  dropoffLocation: string;
  bookingDate: string;
  bookingTime: string;
  vehicle: string;
  bookingStatus: string;
  paymentStatus: string;
  serviceType: string;
  is_excort: boolean;
  totalPrice: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter"); // assigned, pending, completed, or all-delivery

  // Get the filter from query params
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("/rider_booking/my_bookings", "GET");
      if (response.data) {
        let allBookings: Booking[] = response.data as Booking[];

        let filteredBookings: Booking[] = allBookings;

        if (filter) {
          if (filter === "all-delivery") {
            // Show all bookings
            filteredBookings = allBookings;
          } else if (filter === "pending") {
            // Show only assigned bookings
            filteredBookings = allBookings.filter(b => b.bookingStatus === "assigned");
          } else if (filter === "completed") {
            // Show only completed bookings
            filteredBookings = allBookings.filter(b => b.bookingStatus === "completed");
          }
        }


        setBookings(filteredBookings);
      }
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
    <div className="p-6 bg-white h-fit space-y-6 slim-scrollbar w-full">
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
              onClick={() =>
                navigate(`/dashboard/bookings/books/${booking._id}`, { state: { booking } })
              } className="border rounded-md border-gray-200 p-3 text-sm gap-2 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <p className="flex justify-between">
                <span className="font-medium">Booking ID:</span> {booking._id}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">From - To:</span>{" "}
                {booking.pickupLocation} - {booking.dropoffLocation}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Date:</span> {booking.bookingDate}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Time:</span> {booking.bookingTime}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Vehicle:</span> {booking.vehicle}
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-medium ${booking.bookingStatus.toLowerCase() === "completed"
                    ? "text-green-600"
                    : "text-orange-600"
                    }`}
                >
                  {booking.bookingStatus}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Payment:</span>
                <span
                  className={`font-medium ${booking.paymentStatus.toLowerCase() === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {booking.paymentStatus}
                </span>
              </p>
              {booking.is_excort && (
                <p className="text-xs text-[#4FA000] font-semibold">Escort Included 🚓</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
