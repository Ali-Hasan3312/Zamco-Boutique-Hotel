import { motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FadeLeft, FadeUp } from '../utils/animation';
interface OurRoomPropsTypes{
    roomImage: string;
    price: string;
    roomType: string;
    reviews: string;
    description: string;
    to: string
}
const OurRoomProps = ({
    roomImage,
    price,
    roomType,
    reviews,
    description,
    to
}:OurRoomPropsTypes) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className=' mt-8 h-[400px] w-[85vw] mx-auto border border-gray-300 flex items-center justify-center gap-4'>
            <motion.div
             variants={FadeLeft(0.3)}
             initial="hidden"
             whileInView={"visible"}
            className='h-[400px]  w-[50%]'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
             <img src={roomImage} className={`h-[400px] w-full transition-transform duration-300 ease-in-out cursor-pointer ${isHovered ? "scale-95" : ""}`} alt="" onClick={()=>(<Link to={"google.com"} />)} />
            </motion.div>
            <div className='h-[400px] w-[50%] relative flex flex-col items-start justify-center gap-4 ml-24'>
                <div className='h-24 w-20 bg-custom-yellow absolute flex flex-col items-center rounded-bl-[20px] justify-center text-2xl top-0 right-0'>${price} <span className=' text-base text-gray-500 uppercase'>/Night</span></div>
            <h1 className=' text-xl tracking-wide font-medium hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 uppercase'>{roomType}</h1>
            <div className='flex items-center justify-center gap-4 text-custom-yellow text-[20px]'>
            <div className='flex items-center justify-center'>
            <IoIosStar />
             <IoIosStar />
             <IoIosStar />
             <IoIosStar />
             <IoIosStarHalf />
            </div>
             <span className=' text-gray-400 hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 text-sm uppercase'>{reviews}</span>
            </div>
            <motion.span
             variants={FadeUp(0.3)}
             initial="hidden"
             whileInView={"visible"}
            className='text-gray-400 text-lg'>{description}</motion.span>
            <Link to={to} className=' uppercase flex items-center justify-center border-2 border-black h-14 w-48 font-medium text-sm hover:bg-custom-yellow hover:transition-all hover:duration-500 hover:border-none hover:text-white'>More Info</Link>
            </div>
        </div>
  )
}

export default OurRoomProps