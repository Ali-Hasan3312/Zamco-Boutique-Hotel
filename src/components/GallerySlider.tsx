import React, { useRef, useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaSearchPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Gallery1 from "../assets/Our Gallery/Gallery1.jpg"
import Gallery2 from "../assets/Our Gallery/Gallery2.jpg"
import DinningRoom1 from "../assets/Our Gallery/DinningRoom1.jpg"
import DinningRoom2 from "../assets/Our Gallery/DinningRoom2.jpg"
import BedRoom1 from "../assets/Our Gallery/Room1.jpg"
import BedRoom2 from "../assets/Our Gallery/Room2.jpg"
import BedRoom3 from "../assets/Our Gallery/Room3.jpg"
import BedRoom4 from "../assets/Our Gallery/Room4.jpg"
import BedRoom5 from "../assets/Our Gallery/Room5.jpg"
import LivingRoom1 from "../assets/Our Gallery/livingRoom1.jpg"
import LivingRoom2 from "../assets/Our Gallery/livingRoom2.jpg"
import LivingRoom3 from "../assets/Our Gallery/livingRoom3.jpg"

const GallerySlider: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [slidesToShow, setSlidesToShow] = useState<number>(3); // Initial slides to show

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
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

  const slideData = [
    { id: 1, image: Gallery1 },
    { id: 2, image: Gallery2 },
    { id: 3, image: DinningRoom1 },
    { id: 4, image: DinningRoom2 },
    { id: 5, image: BedRoom1 },
    { id: 6, image: BedRoom2 },
    { id: 7, image: BedRoom3 },
    { id: 8, image: BedRoom4 },
    { id: 9, image: BedRoom5 },
    { id: 10, image: LivingRoom1 },
    { id: 11, image: LivingRoom2 },
    { id: 12, image: LivingRoom3 },
    
    
  ];

  // Update slidesToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else if(window.innerWidth < 1550){
        setSlidesToShow(3);
      } else{
        setSlidesToShow(4)
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
