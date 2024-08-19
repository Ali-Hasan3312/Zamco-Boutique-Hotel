import React, { useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';
import { LiaHomeSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
const InfoCard = ({ icon, title, description }:InfoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col gap-3 items-center justify-center flex-wrap text-center px-8 h-[330px] w-[370px] shadow-md bg-white border hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hexagon w-24 h-16 font-normal bg-custom-yellow flex items-center opacity-80 justify-center">
        {icon}
      </div>
      <Link to={"#"} className={`uppercase text-lg font-bold text-black ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>
        {title}
      </Link >
      <div className={`border border-gray-300 ${isHovered ? "border-custom-yellow w-32 transition-all ease-in-out duration-800" : "w-20"}`}></div>
      <span className=''>{description}</span>
    </div>
  );
};

const InfoGrid = () => {
  return (
    <div className="grid grid-cols-3 ml-16 max-sm:grid-cols-1 max-md:grid-cols-2 mt-10">
      <InfoCard 
        icon={<IoMapOutline className="text-[50px]" />}
        title="Map & Directions"
        description="Our hostel is located in the downtown and not too far from airport and bus station so it is quite easy to find us wherever you come from."
      />
      <InfoCard 
        icon={<LiaHomeSolid className="text-[50px]" />}
        title="Accommodation services"
        description="Visit Hostel provides high-quality accommodation services to clients that come to our city from all over the world throughout the year."
      />
      <InfoCard 
        icon={<FaRegStar className="text-[50px]" />}
        title="Great Experience"
        description="With qualified and friendly staff and high level of comfort, we are sure you will have a great experience of staying at the Visit Hostel."
      />
    </div>
  );
};

export default InfoGrid;