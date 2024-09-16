import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearchPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface GalleryPropsTypes{
    image: string;
    to: string;
    room:string;
}
const GalleryProps = ({image, to, room}:GalleryPropsTypes) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
      
      
    };
    const closeModal = () => setIsOpen(false);
  
  return (
    <motion.div
          
          className={`ImageOpen h-[400px] w-[23vw] max-sm:w-[70vw] relative mx-auto`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial= {{opacity: 0, scale: 0.5}}
          whileInView={{opacity: 1, scale: 1}}
          transition={{type:"spring", stiffness:100, delay:0.3}}
          
        >
          <img
            src={image}
            className={`h-full w-full hover:opacity-70 object-cover transition-transform duration-300 ease-in-out ${isHovered ? "scale-90" : ""}`}
            alt=""
            
          />
          {isHovered && (
            <div className='absolute h-[330px] w-[19vw] max-sm:w-[60vw] flex items-center justify-center top-8 left-6 border border-gray-400'
            onClick={openModal}
            >
              <div className='flex flex-col items-center justify-center transition-all duration-300 ease-out hover:text-custom-yellow text-2xl text-white'>
                <FaSearchPlus />
                <Link to={to} className='uppercase font-semibold '>{room}</Link>
              </div>
            </div>
          )}
{isOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close absolute lg:top-[15px] lg:right-[35px] text-[#f1f1f1] lg:text-[40px] sm:text-[100px] sm:font-medium sm:top-32 sm:right-12 font-bold transition duration-300">&times;</span>
          <img src={image} alt={`Room ${room}`} className="modal-content m-auto block lg:w-4/5 lg:h-[60vh] sm:h-[60vh] max-w-[700px]" />
        </div>
      )}
        </motion.div>
  )
}

export default GalleryProps