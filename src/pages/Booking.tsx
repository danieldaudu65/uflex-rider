import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bell, userLogin } from "../assets";
import Search from "../components/Search";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { apiRequest } from "../utils/api";

const BookingPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<any>(state?.booking || null);

  // Fallback — if user reloads the page (no state), fetch by ID
  useEffect(() => {
    if (!booking && id) {
      (async () => {
        try {
          const data = await apiRequest(`/bookingController/bookings/${id}`, "GET");
          setBooking(data.booking);
        } catch (err) {
          toast.error("Failed to fetch booking details");
          navigate("/dashboard/bookings");
        }
      })();
    }
  }, [id, booking]);

  if (!booking) return <p className="text-gray-500">Loading booking...</p>;

  return (
    <div className="p-6 bg-white h-full space-y-6 w-full">
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
        <h2 className="text-lg font-bold">{booking.user?.firstName}</h2>
        <p className="text-gray-600">{booking.user?.email ?? "No email"}</p>

        <div className="mt-3 space-y-1 text-sm">
          <p className="flex justify-between">
            <span className="font-medium">Phone Number:</span>{" "}
            {booking.user?.phone}
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Total Bookings:</span>{" "}
            {booking.customer?.totalBookings ?? 1}
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
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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
                  <span className="text-green-600 font-medium">
                    {booking.bookingStatus}
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
