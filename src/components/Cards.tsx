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
      className="flex flex-col lg:gap-3 gap-10 items-center justify-center flex-wrap text-center px-8 lg:h-[330px] h-[830px] w-[85vw] lg:w-[430px] mx-auto shadow-md bg-white border hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={FadeLeft(0.3)}
      initial="hidden"
      whileInView={"visible"}
      whileHover={{scale:1.1}}
    >
      <div className="hexagon lg:w-24 lg:h-16 h-28 w-36 font-normal bg-custom-yellow flex items-center opacity-70 justify-center">
        {icon}
      </div>
      <Link to={to!} className={`uppercase text-5xl lg:text-lg font-bold text-black ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>
        {title}
      </Link >
      <div className={`lg:border border-2   ${isHovered ? "border-custom-yellow w-32 transition-all ease-in-out duration-800" : "lg:w-20 w-[200px] border-gray-300"}`}></div>
      <span className='text-5xl lg:text-base'>{description}</span>
    </motion.div>
  );
};

