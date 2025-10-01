import React from "react";
import { useNavigate } from "react-router-dom";

interface Rider {
    id: number;
    name: string;
    img: string;
    phone: string;
    vehicle: string;
    email: string;
}

const riders: Rider[] = [
    {
        id: 1,
        name: "Stephen Ene",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "08123456789",
        vehicle: "Toyota Camry",
        email: "stephenene@email.com",
    },
    {
        id: 2,
        name: "John Abel",
        img: "https://randomuser.me/api/portraits/men/45.jpg",
        phone: "09087654321",
        vehicle: "Honda Accord",
        email: "johnabel@email.com",
    },
    {
        id: 3,
        name: "Mary Stone",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
        phone: "07012345678",
        vehicle: "Kia Sportage",
        email: "marystone@email.com",
    },
];

const RiderTable: React.FC = () => {

    const navigate = useNavigate()
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#65CE00] text-white">
                    <tr>
                        <th className="px-3 py-2 text-left min-w-[50px] -">S/N</th>
                        <th className="px-3 py-2 text-left min-w-[150px]">Rider</th>
                        <th className="px-3 py-2 text-left min-w-[150px] ">Phone Number</th>
                        <th className="px-3 py-2 text-left min-w-[150px]">Vehicle</th>
                        <th className="px-3 py-2 text-left min-w-[150px]">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.map((rider, index) => (
                        <tr
                            key={rider.id}
                            onClick={() =>navigate('rider')}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <td className="p-3 border-b">{index + 1}</td>
                            <td className="p-3 border-b flex items-center gap-3">
                                <img
                                    src={rider.img}
                                    alt={rider.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium">{rider.name}</span>
                            </td>
                            <td className="p-3 border-b">{rider.phone}</td>
                            <td className="p-3 border-b">{rider.vehicle}</td>
                            <td className="p-3 border-b text-blue-600">{rider.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default RiderTable;
