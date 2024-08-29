import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { IoIosStar, IoIosStarHalf, IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FadeLeft, FadeUp } from '../utils/animation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../main';
interface OurRoomPropsTypes{
    roomImage: string;
    price: string;
    roomType: string;
    reviews: string;
    description: string;
    to: string;
    
}
const OurRoomProps = ({
    roomImage,
    price,
    roomType,
    description,
    to,
}:OurRoomPropsTypes) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const {checkOut, setbookButton, checkIn,rooms} = useContext(Context)
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      contact: '',
    });
   
    const handleButtonClick = () => {
        setShowPopup(true);
        setbookButton(false)
      };
      
      const handleClosePopup = () => {
        setShowPopup(false);
        
      };
      const handleChange = (e:any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async () => {
        if(!checkOut){
          toast.error("Please select a check out date first")
          return;
        }
        try {
          const response = await axios.post('http://localhost:4000/api/v1/book', {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.contact,
            checkIn,
            checkOut,
            rooms,
            roomId: to, // Replace with the actual roomId
          });
      
          if (response.data.success) {
            toast.success("Room booked successfully!");
            handleClosePopup();
            setbookButton(true) // Close the popup after successful submission
          }
        } catch (error:any) {
          toast.error(error.response?.data?.message || "Booking failed. Please try again.");
         
        }
      };

      
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
             <span className=' text-gray-400 hover:text-custom-yellow cursor-pointer transition-all ease-out duration-300 text-sm max-sm:text-[8px] uppercase'>5</span>
            </div>
            <motion.span
             variants={FadeUp(0.3)}
             initial="hidden"
             whileInView={"visible"}
            className='text-gray-400 text-lg max-sm:text-sm'>{description}</motion.span>
            <button  className=' uppercase flex items-center justify-center border-2 border-black h-14 w-48 font-medium text-sm hover:bg-custom-yellow hover:transition-all hover:duration-500 hover:border-none hover:text-white max-sm:h-8 max-sm:w-28 max-sm:text-[12px]'
            onClick={handleButtonClick}
            >Book Now</button>
            </div>
            
        {showPopup && (
           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <motion.div className="bg-gray-200 h-[500px] relative w-[380px] rounded shadow-md"
              initial= {{opacity: 0, scale: 0.5}}
              whileInView={{opacity: 1, scale: 1}}
              transition={{type:"spring", stiffness:100, delay:0.3}}
            >
              <h2 className="text-xl font-bold mb-4 text-center pt-2">Book Room</h2>
              <IoMdClose onClick={handleClosePopup} className="absolute top-3 right-3 text-xl cursor-pointer" />
              <div className="flex flex-col items-center justify-center w-full ml-8">
                <div className="flex flex-col px-2 gap-2 w-full">
                  <label className=" text-black font-semibold">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className=" w-[80%] py-2 px-2" />
                </div>
                <div className="flex flex-col px-2 gap-2 w-full">
                  <label className=" text-black font-semibold">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className=" w-[80%] py-2 px-2" />
                </div>
                <div className="flex flex-col px-2 gap-2 w-full">
                  <label className=" text-black font-semibold">Contact</label>
                  <input type="text" name="contact" value={formData.contact} onChange={handleChange} className=" w-[80%] py-2 px-2" />
                </div>
              </div>
              <button onClick={handleSubmit} className="bg-gray-500 absolute bottom-6 left-36 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </motion.div>
          </div>
        )}
        </div>
  )
}

export default OurRoomProps