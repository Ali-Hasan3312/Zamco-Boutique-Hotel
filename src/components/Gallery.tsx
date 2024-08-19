import { Link } from 'react-router-dom'
import image1 from "../assets/Rooms_pix/room1.jpg"
import image2 from "../assets/Rooms_pix/room2.jpg"
import image3 from "../assets/Rooms_pix/room3.jpg"
import image4 from "../assets/Rooms_pix/room4.jpg"
import image5 from "../assets/Rooms_pix/room5.jpg"
import image6 from "../assets/Rooms_pix/room6.jpg"
import image7 from "../assets/Rooms_pix/room7.jpg"
import image8 from "../assets/Rooms_pix/room8.jpg"
import { useState } from 'react'
import { FaSearchPlus } from "react-icons/fa";

const Gallery = () => {
    const [hoverStates, setHoverStates] = useState(Array(8).fill(false));

  // Function to handle mouse enter
  const handleMouseEnter = (index:any) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  // Function to handle mouse leave
  const handleMouseLeave = (index:any) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };
    
  return (
    <div className=' mt-12'>
       <div className='flex flex-col font-semibold gap-2 items-center justify-center'>
       <h1 className=' text-center text-2xl'>Our Gallery</h1>
        <div className='flex items-center justify-center gap-8 text-sm mt-2'>
            <Link to={"#"} className=' text-custom-yellow uppercase'>All</Link>
            <div className=' border h-4 border-r border-gray-400 '></div>
            <Link to={"#"} className=' text-gray-400 tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300'>Bedrooms</Link>
            <div className=' border h-4 border-r border-gray-400'></div>
            <Link to={"#"} className=' text-gray-400 tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300'>living rooms</Link>
            <div className=' border h-4 border-r border-gray-400'></div>
            <Link to={"#"} className=' text-gray-400 tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300'>Dining rooms</Link>
        </div>
       </div>
       <div className='grid grid-cols-4 gap-3 mt-10 ml-6'>
      {[image1, image2, image3, image4, image5, image6, image7, image8].map((image, index) => (
        <div
          key={index}
          className={`h-[300px] w-[300px] relative`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <img
            src={image}
            className={`h-full w-full transition-transform duration-300 ease-in-out ${hoverStates[index] ? "scale-90" : ""}`}
            alt=""
          />
          {hoverStates[index] && (
            <div className='absolute h-[250px] w-[250px] flex items-center justify-center top-6 left-6 border border-gray-400'>
              <div className='flex flex-col items-center justify-center text-2xl text-white'>
                <FaSearchPlus />
                <Link to={"#"} className='uppercase font-semibold'>{`Room #${index + 1}`}</Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Gallery
