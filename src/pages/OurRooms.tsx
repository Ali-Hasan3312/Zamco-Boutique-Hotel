import React, { useState } from 'react'
import room1 from "../assets/Rooms_pix/room1.jpg"
import { Link } from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
const OurRooms = () => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='mt-16'>
        <h1 className=' text-2xl text-center font-medium tracking-wide uppercase'>our rooms</h1>
        <div className=' mt-8 h-[400px] w-[85vw] mx-auto border border-gray-300 flex items-center justify-center gap-4'>
            <div className='h-[400px]  w-[50%]'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
             <img src={room1} className={`h-[400px] w-full transition-transform duration-300 ease-in-out cursor-pointer ${isHovered ? "scale-95" : ""}`} alt="" onClick={()=>(<Link to={"google.com"} />)} />
            </div>
            <div className='h-[400px] w-[50%] relative flex flex-col items-start justify-center gap-4 ml-24'>
                <div className='h-24 w-20 bg-custom-yellow absolute flex flex-col items-center rounded-bl-[20px] justify-center text-2xl top-0 right-0'>$30 <span className=' text-base text-gray-500 uppercase'>/Night</span></div>
            <h1 className=' text-xl tracking-wide font-medium hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 uppercase'>Double room(private)</h1>
            <div className='flex items-center justify-center gap-4 text-custom-yellow text-[20px]'>
            <div className='flex items-center justify-center'>
            <IoIosStar />
             <IoIosStar />
             <IoIosStar />
             <IoIosStar />
             <IoIosStarHalf />
            </div>
             <span className=' text-gray-400 hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 text-sm uppercase'>4 customer reviews</span>
            </div>
            <span className='text-gray-400 text-lg'>Double room is one of the most popular choices at Visit <br /> Hostel. It includes one double bed with comfortable <br />  mattresses and bed linen, WC, and a TV set.</span>
            <Link to={"#"} className=' uppercase flex items-center justify-center border-2 border-black h-14 w-48 font-medium text-sm hover:bg-custom-yellow hover:transition-all hover:duration-500 hover:border-none hover:text-white'>More Info</Link>
            </div>
        </div>
    </div>
  )
}

export default OurRooms