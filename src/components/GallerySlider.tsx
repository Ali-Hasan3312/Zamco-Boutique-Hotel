import React, { useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaSearchPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import room1 from "../assets/Rooms_pix/room1.jpg";
import room2 from "../assets/Rooms_pix/room2.jpg"
import room3 from "../assets/Rooms_pix/room3.jpg";
import room4 from "../assets/Rooms_pix/room4.jpg";
import room5 from "../assets/Rooms_pix/room5.jpg";
import room6 from "../assets/Rooms_pix/room6.jpg";
import room7 from "../assets/Rooms_pix/room7.jpg";
import room8 from "../assets/Rooms_pix/room8.jpg";


const GallerySlider: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'absolute', bottom: '-30px', width: '100%' }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  // Sample data for multiple slides
  const slideData = [
    { id: 1, image: room1 },
    { id: 2, image: room2 },
    { id: 3, image: room3 },
    { id: 4, image: room4 },
    { id: 5, image: room5 },
    { id: 6, image: room6 },
    { id: 7, image: room7 },
    { id: 8, image: room8 },
  ];

  return (
    <div className='w-full rounded-r-[40px] h-[340px] bg-gray-100 mt-16 overflow-y-hidden'>
       <div className='h-8 w-44 bg-white text-black mx-auto'>
       <h1 className='text-center'>Gallery</h1>
       </div>
      <div className='pt-20 pb-10 -mt-12'>
        <Slider ref={sliderRef} {...settings} className='mx-12'>
          {slideData.map((slide, index) => (
            <div key={slide.id} className="px-2">
              <div 
                className="h-[230px] w-[350px] relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img src={slide.image} className='h-full w-full object-cover' alt="" />
                {hoveredIndex === index && (
                  <div className='h-[85%] w-[85%] border border-gray-300 absolute transition-transform ease-in-out duration-300 text-white text-3xl top-4 left-4 flex items-center justify-center'>
                    <Link to={"#"} className='hover:text-custom-yellow'>
                      <FaSearchPlus />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GallerySlider;