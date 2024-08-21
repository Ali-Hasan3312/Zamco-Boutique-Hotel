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
    <div className=' mt-8 h-[400px] w-[85vw] max-sm:h-[300px] mx-auto border border-gray-300 flex items-center justify-center gap-4 max-sm:gap-2'>
            <motion.div
             variants={FadeLeft(0.3)}
             initial="hidden"
             whileInView={"visible"}
            className='h-[400px]  w-[50%]'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
             <img src={roomImage} className={`h-[400px] max-sm:h-[300px] object-cover max-sm:mt-[50px] w-full transition-transform duration-300 ease-in-out cursor-pointer ${isHovered ? "scale-95" : ""}`} alt="" onClick={()=>(<Link to={"google.com"} />)} />
            </motion.div>
            <div className='h-[400px] max-sm:h-[300px] max-sm:gap-1 w-[50%] relative flex flex-col items-start justify-center gap-4 ml-24 max-sm:ml-4'>
                <div className='h-24 w-20 max-sm:h-16 max-sm:w-12 max-sm:text-base bg-custom-yellow absolute flex flex-col items-center rounded-bl-[20px] justify-center text-2xl top-0 right-0'>${price} <span className=' text-base max-sm:text-[10px] text-gray-500 uppercase'>/Night</span></div>
            <h1 className=' text-xl max-sm:text-sm tracking-wide font-medium hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 uppercase'>{roomType}</h1>
            <div className='flex items-center justify-center gap-4 max-sm:gap-2 text-custom-yellow text-[20px]'>
            <div className='flex items-center justify-center'>
            <IoIosStar className='max-sm:text-sm'/>
             <IoIosStar className='max-sm:text-sm'/>
             <IoIosStar className='max-sm:text-sm'/>
             <IoIosStar className='max-sm:text-sm'/>
             <IoIosStarHalf className='max-sm:text-sm'/>
            </div>
             <span className=' text-gray-400 hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 text-sm max-sm:text-[8px] uppercase'>{reviews}</span>
            </div>
            <motion.span
             variants={FadeUp(0.3)}
             initial="hidden"
             whileInView={"visible"}
            className='text-gray-400 text-lg max-sm:text-sm'>{description}</motion.span>
            <Link to={to} className=' uppercase flex items-center justify-center border-2 border-black h-14 w-48 font-medium text-sm hover:bg-custom-yellow hover:transition-all hover:duration-500 hover:border-none hover:text-white max-sm:h-8 max-sm:w-28 max-sm:text-[12px]'>More Info</Link>
            </div>
        </div>
  )
}

export default OurRoomProps