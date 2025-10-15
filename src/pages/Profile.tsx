import React, { useEffect, useState } from "react";
import { bell, call, car, del, edit, mail,  userLogin } from "../assets";

interface Rider {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  vehicle: string;
  image?: string;
}

const RiderProfile: React.FC = () => {
  const [rider, setRider] = useState<Rider | null>(null);

  const profilePic =                       "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

  useEffect(() => {
    const storedRider = localStorage.getItem("rider");
    if (storedRider) {
      const parsedRider: Rider = JSON.parse(storedRider);
      setRider({
        ...parsedRider,
        image: profilePic, // default image if none provided
      });
    }
  }, []);

  if (!rider) return <p className="text-center mt-12">Loading profile...</p>;

  return (
    <div className="p-6 bg-white h-[100vh] space-y-6 slim-scrollbar w-full">
      {/* Header */}
      <div className='flex relative justify-center items-center'>
        <h1 className='font-extrabold text-lg'>Profile</h1>
        <div className='flex gap-2 absolute right-1 justify-end'>
          <img src={bell} alt="Notifications" />
          <div className='bg-white p-1 rounded-full'>
            <img src={userLogin} alt="User" />
          </div>
        </div>
      </div>

      {/* Rider Image + Name */}
      <div className="flex mt-12 flex-col items-center space-x-4">
        <img
          src={rider.image}
          alt={`${rider.firstName} ${rider.lastName}`}
          className="w-30 h-30 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{rider.firstName} {rider.lastName}</h2>
          {/* <p className="text-gray-500 text-sm">{rider.vehicle}</p> */}
        </div>
      </div>

      {/* Rider Info */}
      <div className="space-y-8 mt-6">
        <p className="flex gap-8 items-center">
          <span className="font-medium"><img src={mail} alt="" /></span>
          <span>{rider.email}</span>
        </p>
        {rider.phoneNumber && (
          <p className="flex gap-8 items-center">
            <span className="font-medium"><img src={call} alt="" /></span>
            <span>{rider.phoneNumber}</span>
          </p>
        )}
        <p className="flex gap-8 items-center">
          <span className="font-medium"><img src={car} alt="" /></span>
          <span>{rider.vehicle}</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex h-[40vh] items-end justify-between space-x-3 pt-3">
        <button className="px-4 py-2 text-sm flex gap-3 rounded-md bg-[#FE752B] text-white hover:bg-orange-700">
          <img src={edit} alt="" /> Edit Role
        </button>
        <button className="px-4 flex gap-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
          <img src={del} alt="" /> Delete Rider
        </button>
      </div>
    </div>
  );
};

export default RiderProfile;
