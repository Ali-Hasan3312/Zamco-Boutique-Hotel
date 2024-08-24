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
        <button onClick={scrollToTop} className='fixed bottom-2 z-[1000] right-2 p-4 rounded-full bg-custom-yellow text-black'>
        <GrLinkTop />
    </button>
    )}
    </>
   
  )
}

export default GotoTopButton