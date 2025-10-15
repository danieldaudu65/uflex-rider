import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bell, booked, completed, pending, userLogin } from "../assets";
import Search from "../components/Search";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";

interface Stats {
  total_assigned_booking: number;
  total_pending_booking: number;
  total_completed_booking: number;
}

interface Booking {
  _id: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  serviceType: string;
  is_excort: boolean;
  bookingStatus: string;
  totalPrice: number;
  paymentStatus: string;
  createdAt: string;
  vehicle: string;
  startTime?: string;
  endTime?: string;
  totalDuration?: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<Stats>({
    total_assigned_booking: 0,
    total_pending_booking: 0,
    total_completed_booking: 0,
  });

  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // =============================
  // 🧩 Fetch Rider Stats
  // =============================
  const fetchRiderStats = async () => {
    try {
      const data = await apiRequest("/rider_dashboard/stats");
      if (data.success) setStats(data.stats);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load stats");
    }
  };

  // =============================
  // 📦 Fetch Recent Bookings
  // =============================
  const fetchRecentBookings = async () => {
    try {
      const data = await apiRequest("/rider_dashboard/recent-bookings");
      if (data.success) setRecentBookings(data.recentBookings);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load bookings");
    }
  };

  // =============================
  // 🚀 Start Booking
  // =============================
  const handleStartBooking = async (bookingId: string) => {
    try {
      const res = await apiRequest(`/rider_dashboard/booking/start`, "POST", { bookingId });
      if (res.success) {
        toast.success("Booking started!");
        setActiveBookingId(bookingId);
        setElapsedTime(0);
        fetchRecentBookings();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to start booking");
    }
  };

  // =============================
  // 🏁 End Booking
  // =============================
  const handleEndBooking = async (bookingId: string) => {
    try {
      const res = await apiRequest(`/rider_dashboard/booking/end`, "POST", { bookingId });
      if (res.success) {
        toast.success(`Booking ended — ${res.booking.totalDuration} min`);
        setActiveBookingId(null);
        setElapsedTime(0);
        await fetchRiderStats();
        await fetchRecentBookings();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to end booking");
    }
  };

  // =============================
  // ⏱ Timer Logic
  // =============================
  useEffect(() => {
    let timer: any;
    if (activeBookingId) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeBookingId]);

  // =============================
  // 🔁 Auto-Resume Timer From Backend
  // =============================
  useEffect(() => {
  // Find active booking
  const activeBooking = recentBookings.find(
    (b) => b.bookingStatus === "started" && b.startTime && !b.endTime
  );

  if (activeBooking && activeBooking.startTime) {
    setActiveBookingId(activeBooking._id);

    // Safely calculate elapsed seconds
    const start = new Date(activeBooking.startTime);
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

    setElapsedTime(elapsedSeconds);
  } else {
    setActiveBookingId(null);
    setElapsedTime(0);
  }
}, [recentBookings]);

  // =============================
  // 📲 Fetch Data Initially
  // =============================
  useEffect(() => {
    fetchRiderStats();
    fetchRecentBookings();
  }, []);

  // =============================
  // 🕒 Format Timer Display
  // =============================
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // =============================
  // 📊 Dashboard Cards
  // =============================
  const home_pages = [
    {
      label: "Assigned Bookings",
      number: stats.total_assigned_booking,
      icon: booked,
      bg: "#FFAC7E80",
      link: "all-delivery",
    },
    {
      label: "Pending",
      number: stats.total_pending_booking,
      icon: pending,
      bg: "#FFE0F7",
      link: "pending",
    },
    {
      label: "Completed",
      number: stats.total_completed_booking,
      icon: completed,
      bg: "#C0FFA9",
      link: "completed",
    },
  ];

  return (
    <div className="p-6 space-y-6 slim-scrollbar w-full">
      {/* Header */}
      <div className="flex relative justify-center items-center">
        <h1 className="font-extrabold text-white text-lg">Dashboard</h1>
        <div className="flex gap-2 absolute right-1 justify-end">
          <img src={bell} alt="Notifications" />
          <div className="bg-white p-1 rounded-full">
            <img src={userLogin} alt="User" />
          </div>
        </div>
      </div>

      <Search />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {home_pages.map((item, index) => (
          <div
            onClick={() => navigate(`${item.link}`)}
            key={index}
            className="bg-white cursor-pointer rounded-xl relative shadow-md p-6 h-48 flex flex-col justify-between"
          >
            <div
              className="absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
            </div>
            <div className="mt-auto flex flex-col h-full justify-center">
              <p className="text-sm font-extrabold md:text-lg text-gray-500 capitalize">
                {item.label}
              </p>
              <p className="text-4xl font-bold text-[#FE752B]">{item.number}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Timer Display */}
      {activeBookingId && (
        <div className="bg-green-100 border border-green-300 text-green-700 font-bold p-4 rounded-lg">
          🚗 Booking in progress — Time Elapsed: {formatTime(elapsedTime)}
        </div>
      )}

      {/* Recent Bookings */}
      <h1 className="text-lg font-extrabold mb-4">Recent Bookings</h1>
      <div className="bg-white rounded-xl shadow-md overflow-x-auto slim-scrollbar max-h-[400px] overflow-y-auto">
        <table className="w-full text-[12px] md:text-lg table-auto">
          <thead className="bg-green-main">
            <tr>
              <th className="px-3 py-2 text-left">Booking ID</th>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-5 text-left">From - To</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Vehicle</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Payment</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => {
                const date = new Date(booking.createdAt).toLocaleDateString();
                const time = new Date(booking.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={booking._id} className="border-b border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-gray-700">
                      #{booking._id.slice(-6)}
                    </td>
                    <td className="px-3 py-5">
                      {booking.user
                        ? `${booking.user.firstName} ${booking.user.lastName}`
                        : "—"}
                    </td>
                    <td className="px-3 py-2">
                      {booking.pickupLocation} → {booking.dropoffLocation}
                    </td>
                    <td className="px-3 py-2">{date}</td>
                    <td className="px-3 py-2">{time}</td>
                    <td className="px-3 py-2">{booking.vehicle}</td>
                    <td className="px-3 py-2 capitalize">{booking.bookingStatus}</td>
                    <td
                      className={`px-3 py-2 font-semibold ${
                        booking.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {booking.paymentStatus}
                    </td>

                    <td className="px-3 py-2">
                      {booking.bookingStatus === "assigned" && (
                        <button
                          onClick={() => handleStartBooking(booking._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Start Booking
                        </button>
                      )}

                      {booking.bookingStatus === "started" && (
                        <button
                          onClick={() => handleEndBooking(booking._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          End Booking
                        </button>
                      )}

                      {booking.bookingStatus === "completed" && (
                        <span className="text-xs text-gray-600">
                          ⏱ {booking.totalDuration
                            ? `${booking.totalDuration} min`
                            : "Completed"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No recent bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
