import React, { useState } from 'react';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';
import { FadeLeft } from '../utils/animation';
interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    to?: string 
  }
export const  InfoCard = ({ icon, title, description, to }:InfoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="flex flex-col gap-3 items-center justify-center flex-wrap text-center px-8 h-[330px] w-[370px] sm:w-[490px] lg:w-[430px] mx-auto shadow-md bg-white border hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={FadeLeft(0.3)}
      initial="hidden"
      whileInView={"visible"}
      whileHover={{scale:1.1}}
    >
      <div className="hexagon w-24 h-16 font-normal bg-custom-yellow flex items-center opacity-70 justify-center">
        {icon}
      </div>
      <Link to={to!} className={`uppercase text-lg font-bold text-black ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>
        {title}
      </Link >
      <div className={`border  ${isHovered ? "border-custom-yellow w-32 transition-all ease-in-out duration-800" : "w-20 border-gray-300"}`}></div>
      <span className=''>{description}</span>
    </motion.div>
  );
};

