import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface GalleryPropsTypes{
    image: string;
    to: string;
    room:number;
}
const GalleryProps = ({image, to, room}:GalleryPropsTypes) => {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.div
          
          className={`h-[300px] w-[300px] relative`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial= {{opacity: 0, scale: 0.5}}
          whileInView={{opacity: 1, scale: 1}}
          transition={{type:"spring", stiffness:100, delay:0.3}}
          
        >
          <img
            src={image}
            className={`h-full w-full transition-transform duration-300 ease-in-out ${isHovered ? "scale-90" : ""}`}
            alt=""
          />
          {isHovered && (
            <div className='absolute h-[250px] w-[250px] flex items-center justify-center top-6 left-6 border border-gray-400'>
              <div className='flex flex-col items-center justify-center transition-all duration-300 ease-out hover:text-custom-yellow text-2xl text-white'>
                <FaSearchPlus />
                <Link to={to} className='uppercase font-semibold '>{`Room 0${room}`}</Link>
              </div>
            </div>
          )}
        </motion.div>
  )
}

export default GalleryProps