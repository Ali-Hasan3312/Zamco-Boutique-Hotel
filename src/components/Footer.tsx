import { motion } from "framer-motion";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
interface FooterProps {
    onScrollToContact: () => void;
    onScrollToGallery: () => void;
    onScrollToServices: () => void;
    onScrollToRooms: () => void;
           
  }
const Footer = ({onScrollToGallery,onScrollToServices,onScrollToRooms }: FooterProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
       
      });
      console.log(formData);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handleButtonClick = () => {
        setShowPopup(true);
      };
      const handleClosePopup = () => {
        setShowPopup(false);
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
       
    
        try {
          const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/touch`, {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          });
          
          
    
          if (response.data) {
            toast.success("Message sent successfully!");
            // Reset form after successful submission
            setFormData({
              name: "",
              email: "",
              phoneNumber: "",
             
            });
            setShowPopup(false);
           
          }
        } catch (error:any) {
          console.error("Error sending message:", error);
          toast.error(error.response?.data?.message || "Message could not sent. Please try again.");
        }
      };
  return (
   <div>
    
     <div className='h-[350px] w-full bg-zinc-700 mt-16'>
        <div className='w-[85%] grid grid-cols-3 mx-auto max-sm:gap-8 max-sm:w-[95%]'>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-sm'>Contact us</h1>
                <div className='flex items-center gap-3 max-sm:gap-1'>
                    <MdCall className=' text-2xl text-custom-yellow max-sm:text-base'/>
                    <Link to={"#"} className='text-base max-sm:text-[12px] text-nowrap text-white hover:text-custom-yellow'>+1 323-913-4688</Link>
                </div>
                <div className='flex items-center gap-3 max-sm:gap-1'>
                    <IoMdMail className=' text-2xl text-custom-yellow max-sm:text-sm'/>
                    <Link to={"#"} className='text-base text-white hover:text-custom-yellow max-sm:text-[12px]'>booking@baku.com</Link>
                </div>
                <div className='flex items-center gap-3'>
                    <FaLocationArrow className=' text-2xl text-custom-yellow'/>
                    <Link to={"https://g.co/kgs/Y9cgy1y"} className='text-base text-white hover:text-custom-yellow max-sm:text-[12px]'> Old City, Sabir str. 23, <br /> near Baki 1001, Azerbaijan <br /> </Link>
                </div>
            </div>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-sm text-nowrap'>Popular News</h1>
                <div className='flex flex-col '>
                    
                    <Link to={"#"} className='text-base max-sm:text-sm text-white hover:text-custom-yellow'>Hostel or Hotel: What to Choose and Why</Link>
                    <span className='text-gray-400 max-sm:text-[12px]'>May 04, 2023</span>
                </div>
                <div className='flex flex-col '>
                    
                    <Link to={"#"} className='text-base max-sm:text-sm text-white hover:text-custom-yellow'>Our Guide for Travelers on a Budget</Link>
                    <span className='text-gray-400 max-sm:text-[12px]'>May 04, 2023</span>
                </div>
                
                
            </div>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-sm'>Quick links</h1>
                <div className='grid grid-cols-2 gap-1 max-sm:grid-cols-1'>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>About Us</Link>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <button 
                        onClick={onScrollToServices}
                        className='text-white'>Our Services</button>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <button 
                        onClick={onScrollToRooms}
                        className='text-white'>Our Rooms</button>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <button 
                        onClick={onScrollToGallery}
                        className='text-white'>Gallery</button>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>Our Team</Link>
                    </div>
                </div>
                <div className='flex items-center max-sm:flex-col gap-2 max-sm:text-sm text-nowrap'>
                    <button className='h-20 w-48 py-3 px-8 max-sm:h-8 max-sm:w-20 max-sm:text-[12px] border border-white text-white hover:border-none hover:bg-custom-yellow hover:text-white flex items-center justify-center transition-all duration-300'
                    onClick={onScrollToRooms}
                    >Book Now</button>
                    <button className='h-20 w-48 py-3 px-8  bg-custom-yellow flex items-center justify-center hover:border-none max-sm:h-8 max-sm:w-20 max-sm:text-[12px] hover:bg-black hover:text-white text-black transition-all duration-300'
                    onClick={handleButtonClick}
                    >Get In Touch</button>
                     {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        
        >
          <motion.div className="bg-gray-200 h-[450px] relative w-[380px] rounded shadow-md"
          initial= {{opacity: 0, scale: 0.5}}
          whileInView={{opacity: 1, scale: 1}}
          transition={{type:"spring", stiffness:100, delay:0.3}}
          >
            <h2 className="text-xl font-bold mb-4 text-center pt-2">Get In Touch</h2>
            <div className="">
            <IoMdClose onClick={handleClosePopup} className="absolute top-3 right-3 text-xl cursor-pointer" />
            </div>
            
           
           <div className="flex flex-col items-center justify-center w-full ml-8">
           <div className="flex flex-col px-2 gap-2 w-full">
           <label className=" text-black font-semibold">Full Name</label>
           <input type="text"
           name="name"
           value={formData.name}
           onChange={handleChange}
           className=" w-[80%] py-2 px-2" />
           </div>
           <div className="flex flex-col px-2 gap-2 w-full">
           <label className=" text-black font-semibold">Email</label>
           <input type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           className=" w-[80%] py-2 px-2" />
           </div>
           <div className="flex flex-col px-2 gap-2 w-full">
           <label className=" text-black font-semibold">Contact</label>
           <input type="text"
           name="phoneNumber"
           value={formData.phoneNumber}
           onChange={handleChange}
           className=" w-[80%] py-2 px-2" />
           </div>
           </div>
            <button onClick={handleSubmit} className="bg-gray-500 absolute bottom-28 left-36 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </motion.div>
        </div>
      )}
                </div>
                
                
            </div>
           

        </div>
    </div>
    <div className="h-24 w-full bg-zinc-800 flex items-center max-sm:text-[12px] max-sm:leading-tight justify-between px-20 max-sm:px-8 text-gray-500 text-xl">
     <span className="">© 2024 Zamco Boutique Hotel. All rights reserved</span>
     <div className="flex items-center gap-4 max-sm:gap-1">
    
     <Link to={"#"} className="hover:text-custom-yellow transition-all duration-300 text-nowrap max-sm:ml-2">Privacy Policy</Link>
     </div>
    </div>
   </div>
  )
}

export default Footer