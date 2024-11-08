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
    <div className="flex flex-col items-center justify-center h-[200px] w-[380px] lg:w-[200px] mx-auto text-center gap-4 lg:gap-2 mt-8"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
    <motion.div
     variants={FadeLeft(0.3)}
     initial="hidden"
     whileInView={"visible"}
    className="hexagon h-full py-20 lg:py-0 w-48 lg:w-24 lg:h-16 font-normal bg-gray-200 flex items-center opacity-80 justify-center">
    {icon}
    </motion.div>
    <Link to={"#"} className={`uppercase text-3xl lg:text-lg font-bold text-black text-nowrap ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>{title}</Link>
    <motion.span
     variants={FadeUp(0.3)}
     initial="hidden"
     whileInView={"visible"}
    className=" text-gray-400 text-3xl lg:text-base">{description}</motion.span>
    </div>
   
  )
}

export default ServicesProps