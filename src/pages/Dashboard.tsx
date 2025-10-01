import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bell, booked, completed, pending,  userLogin } from '../assets';
import Search from '../components/Search';
import { stats, recentBookings } from '../data/Bookings';

import type { RecentBooking } from '../data/Bookings';

const Dashboard:React.FC = () => {
    const navigate = useNavigate();
    // const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    // const toggleMenu = (index: number) => {
    //     setOpenMenuIndex(openMenuIndex === index ? null : index);
    // };

    const home_pages = [
        { label: 'Assigned Bookings', number: stats.totalBookings, icon: booked, bg: '#FFAC7E80', link: 'all-delivery' },
        { label: 'Pending', number: stats.completed, icon: completed, bg: '#C0FFA9', link: 'completed' },
        { label: 'Completed', number: stats.pending, icon: pending, bg: '#FFE0F7', link: 'pending' },

    ];

    return (
        <div className="p-6 space-y-6 slim-scrollbar w-full">
            <div className='flex relative justify-center items-center'>
                <h1 className='font-extrabold text-white text-lg'>Dashboard</h1>
                <div className='flex gap-2 absolute right-1 justify-end'>
                    <img src={bell} className='w' alt="Notifications" />
                    <div className='bg-white p-1 rounded-full'>
                        <img src={userLogin} className='w' alt="User" />
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
                            <p className="text-sm font-extrabold md:text-lg text-gray-500 capitalize">{item.label}</p>
                            <p className="text-4xl font-bold text-[#FE752B]">{item.number}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Table */}
            <h1 className="text-lg font-extrabold mb-4">Recent Bookings</h1>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto slim-scrollbar max-h-[400px] overflow-y-auto">
                <table className="w-full text-[12px] md:text-lg table-auto">
                    <thead className="bg-green-main">
                        <tr>
                            <th className="px-3 py-2 text-left min-w-[80px]">Booking ID</th>
                            <th className="px-3 py-2 text-left min-w-[120px]">Customer</th>
                            <th className="px-3 py-2 text-left min-w-[150px]">From - To</th>
                            <th className="px-3 py-2 text-left min-w-[100px]">Date</th>
                            <th className="px-3 py-2 text-left min-w-[80px]">Time</th>
                            <th className="px-3 py-2 text-left min-w-[100px]">Vehicle</th>
                            <th className="px-3 py-2 text-left min-w-[90px]">Status</th>
                            <th className="px-3 py-2 text-left min-w-[90px]">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBookings.map((booking: RecentBooking, index: number) => (
                            <tr key={index} className="hover:bg-gray-50 bg-white">
                                <td className="px-3 py-2">{booking.id}</td>
                                <td className="px-3 py-2">{booking.customerName} </td>
                                <td className="px-3 py-2">{booking.fromLocation} - {booking.toLocation}</td>
                                <td className="px-3 py-2">{booking.date}</td>
                                <td className="px-3 py-2">{booking.time}</td>
                                <td className="px-3 py-2">{booking.vehicle}</td>
                                <td className="px-3 py-2">{booking.status}</td>
                                <td className="px-3 py-2">{booking.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
