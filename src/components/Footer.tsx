import { FaLocationArrow } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";
const Footer = () => {
  return (
   <div>
     <div className='h-[350px] w-full bg-zinc-700 mt-16'>
        <div className='w-[85%] grid grid-cols-3 mx-auto max-sm:gap-12'>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-base'>Contact us</h1>
                <div className='flex items-center gap-3 max-sm:gap-1'>
                    <MdCall className=' text-2xl text-custom-yellow max-sm:text-base'/>
                    <Link to={"#"} className='text-base max-sm:text-sm text-white hover:text-custom-yellow'>+1 323-913-4688</Link>
                </div>
                <div className='flex items-center gap-3 max-sm:gap-1'>
                    <IoMdMail className=' text-2xl text-custom-yellow max-sm:text-base'/>
                    <Link to={"#"} className='text-base text-white hover:text-custom-yellow max-sm:text-sm'>booking@baku.com</Link>
                </div>
                <div className='flex items-center gap-3'>
                    <FaLocationArrow className=' text-2xl text-custom-yellow max-sm:text-base'/>
                    <Link to={"#"} className='text-base text-white hover:text-custom-yellow max-sm:text-sm'>4730 Crystal Springs Dr, <br /> Los Angeles, CA 90027</Link>
                </div>
            </div>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-base'>Popular News</h1>
                <div className='flex flex-col max-sm:text-sm'>
                    
                    <Link to={"#"} className='text-base max-sm:sm: text-white hover:text-custom-yellow'>Hostel or Hotel: What to Choose and Why</Link>
                    <span className='text-gray-400'>May 04, 2023</span>
                </div>
                <div className='flex flex-col max-sm:text-sm'>
                    
                    <Link to={"#"} className='text-base max-sm:text-sm text-white hover:text-custom-yellow'>Our Guide for Travelers on a Budget</Link>
                    <span className='text-gray-400'>May 04, 2023</span>
                </div>
                
                
            </div>
            <div className='flex flex-col gap-6 mt-12'>
                <h1 className='text-lg uppercase text-white font-semibold max-sm:text-base'>Quick links</h1>
                <div className='grid grid-cols-2 gap-1 max-sm:grid-cols-1'>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>About Us</Link>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>Blog</Link>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>Our Rooms</Link>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>Gallery</Link>
                    </div>
                    <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                        <div className='h-2 w-2 max-sm:h-1 max-sm:w-1 rounded-full bg-custom-yellow'></div>
                        <Link to={"#"} className='text-white'>Our Team</Link>
                    </div>
                </div>
                <div className='flex items-center gap-2 max-sm:text-sm text-nowrap'>
                    <Link to={"#"} className='h-20 w-48 py-3 px-8 max-sm:h-8 max-sm:w-20 max-sm:text-[12px] border border-white text-white hover:border-none hover:bg-custom-yellow hover:text-white flex items-center justify-center transition-all duration-300'>Book Now</Link>
                    <Link to={"#"} className='h-20 w-48 py-3 px-8  bg-custom-yellow flex items-center justify-center hover:border-none max-sm:h-8 max-sm:w-20 max-sm:text-[12px] hover:bg-black hover:text-white text-black transition-all duration-300'>Get In Touch</Link>
                </div>
                
                
            </div>
           

        </div>
    </div>
    <div className="h-24 w-full bg-zinc-800 flex items-center max-sm:text-sm justify-between px-20 max-sm:px-8 text-gray-500 text-xl">
     <span className="">© 2024 Zamco Hostel. All rights reserved</span>
     <div className="flex items-center gap-4">
    <Link to={"https://www.facebook.com"} className="hover:text-custom-yellow transition-all duration-300"> <FaFacebookF /></Link>
    <Link to={"https://www.youtube.com"} className="hover:text-custom-yellow transition-all duration-300"> <FaTwitter /></Link>
    <Link to={"https://www.twitter.com"} className="hover:text-custom-yellow transition-all duration-300"><IoLogoGoogleplus className="text-xl"/></Link>
    <Link to={"https://www.instagram.com"} className="hover:text-custom-yellow transition-all duration-300"><FiInstagram /></Link>
     <Link to={"#"} className="hover:text-custom-yellow transition-all duration-300 text-nowrap max-sm:ml-2">Privacy Policy</Link>
     </div>
    </div>
   </div>
  )
}

export default Footer