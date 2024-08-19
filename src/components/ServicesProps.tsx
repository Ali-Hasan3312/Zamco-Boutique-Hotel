import { useState } from "react";
import { Link } from "react-router-dom";

interface ServiceTypes  {
    title: string;
    icon : React.ReactNode;
    description: string
 
 }
const ServicesProps = ({icon, title, description}:ServiceTypes) => {
    const [isHovered, setIsHovered] = useState(false)
  return (
    
        
    
    <div className="flex flex-col items-start justify-center h-[200px] w-[200px] text-start gap-2 mt-8"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
    <div className="hexagon w-24 h-16 font-normal bg-gray-200 flex items-center opacity-80 justify-center">
    {icon}
    </div>
    <Link to={"#"} className={`uppercase text-lg font-bold text-black text-nowrap ${isHovered ? "tracking-[0.1rem] transition-all ease-in-out duration-500 text-custom-yellow cursor-pointer" : ""}`}>{title}</Link>
    <span className=" text-gray-400 text-base">{description}</span>
    </div>
   
  )
}

export default ServicesProps