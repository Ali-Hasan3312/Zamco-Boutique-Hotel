import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeLeft, FadeUp } from "../utils/animation";
interface ServiceTypes  {
    title: string;
    icon : React.ReactNode;
    description: string
 
 }
const ServicesProps = ({icon, title, description}:ServiceTypes) => {
    const [isHovered, setIsHovered] = useState(false)
  return (
    
        
    
    <div className="flex flex-col items-center justify-center h-[200px] w-[200px] text-center gap-2 mt-8"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     
    >
    <motion.div
     variants={FadeLeft(0.3)}
     initial="hidden"
     whileInView={"visible"}
    className="hexagon w-24 h-16 font-normal bg-gray-200 flex items-center opacity-80 justify-center">
    {icon}
    </motion.div>
    <Link to={"#"} className={`uppercase text-lg font-bold text-black text-nowrap ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>{title}</Link>
    <motion.span
     variants={FadeUp(0.3)}
     initial="hidden"
     whileInView={"visible"}
    className=" text-gray-400 text-base">{description}</motion.span>
    </div>
   
  )
}

export default ServicesProps