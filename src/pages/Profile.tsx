import React from "react";
import { bell, call, car, del, edit, mail, profilePic, userLogin } from "../assets";
// import Search from "../components/Search";

const RiderProfile:React.FC = () => {
    const rider = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+234 801 234 5678",
        carType: "Toyota Corolla",
        image: profilePic, // replace with actual rider image URL
    };

    return (
        <div className="p-6 bg-white h-[100vh] space-y-6 slim-scrollbar w-full">
            <div className='flex relative justify-center items-center'>
                <h1 className='font-extrabold  text-lg'>Profile</h1>
                <div className='flex gap-2 absolute right-1 justify-end'>
                    <img src={bell} className='w' alt="Notifications" />
                    <div className='bg-white p-1 rounded-full'>
                        <img src={userLogin} className='w' alt="User" />
                    </div>
                </div>
            </div>

            {/* <Search />      Rider Image + Name */}
            <div className="flex mt-12 flex-col items-center space-x-4">
                <img
                    src={rider.image}
                    alt={rider.name}
                    className="w-30 h-30 rounded-full border"
                />
                <div>
                    <h2 className="text-2xl  font-bold">{rider.name}</h2>
                    {/* <p className="text-gray-500 text-sm">{rider.carType}</p> */}
                </div>
            </div>

            {/* Rider Info */}
            <div className="space-y-8">
                <p className="flex  gap-8">
                    <span className="font-medium"> <img src={mail} alt="" /></span>
                    <span>{rider.email}</span>
                </p>
                <p className="flex gap-8">
                    <span className="font-medium"><img src= {call} alt="" /></span>
                    <span>{rider.phone}</span>
                </p>
                <p className="flex gap-8">
                    <span className="font-medium"><img src={car} alt="" /></span>
                    <span>{rider.carType}</span>
                </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex h-[40vh] items-end justify-between space-x-3 pt-3">
                <button className="px-4 py-2 text-sm flex gap-3 rounded-md bg-[#FE752B] text-white hover:bg-blue-700">
               <img src= {edit} alt="" />     Edit Role
                </button>
                <button className="px-4 flex gap-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
                 <img src= {del} alt="" />   Delete Rider
                </button>
            </div>
        </div>
    );
};

export default RiderProfile;
