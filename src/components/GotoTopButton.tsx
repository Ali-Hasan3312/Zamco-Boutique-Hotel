import { useEffect, useState } from 'react';
import { GrLinkTop } from "react-icons/gr";
const GotoTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowButton(window.scrollY > 200); // Show button after scrolling 200px
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  return (
    <>
    {showButton && (
        <button onClick={scrollToTop} className='fixed bottom-2 z-[1000] lg:right-2 lg:p-4 sm:p-8 sm:right-8 sm:bottom-8 rounded-full bg-custom-yellow text-black'>
        <GrLinkTop className='lg:text-sm sm:text-3xl' />
    </button>
    )}
    </>
   
  )
}

export default GotoTopButton