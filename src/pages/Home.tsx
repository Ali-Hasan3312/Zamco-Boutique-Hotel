import { lazy, Suspense, useRef, useState, useEffect } from 'react'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import GotoTopButton from '../components/GotoTopButton'
import Navbar from '../components/navbar'
import ImgSlider from '../components/Slider'
import InfoGrid from './InfoGrid'
const Gallery = lazy(() => import('../pages/Gallery'));
const Services = lazy(() => import('../pages/Services'));
const OurRooms = lazy(() => import('../pages/OurRooms'));
const Loader = lazy(() => import("../components/Loader"));
const SignUp = lazy(() => import("../components/SignUp"));
const GallerSlider = lazy(() => import("../components/GallerySlider"));
const Home = () => {
  const [showImgSlider, setShowImgSlider] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const GalleryRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImgSlider(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToGallery = () => {
    if (GalleryRef.current) {
      GalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('GalleryRef is not available!');
    }
  };

  const handleScrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRooms = () => {
    if (roomsRef.current) {
      roomsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div id='home' className='overflow-x-hidden'>
        <Navbar
          onScrollToGallery={handleScrollToGallery}
          onScrollToServices={handleScrollToServices}
          onScrollToRooms={handleScrollToRooms}
          onScrollToContact={handleScrollToContact}
        />
        {showImgSlider ? (
          <ImgSlider onScrollToRooms={handleScrollToRooms} />
        ) : (
          <Loader />
        )}
        <InfoGrid />
        <GotoTopButton />
        <Gallery ref={GalleryRef}/>
        <Services ref={servicesRef}/>
        <OurRooms ref={roomsRef} />
        <SignUp />
        <GallerSlider />
        <ContactUs ref={contactRef}/>
        <Footer
          onScrollToGallery={handleScrollToGallery}
          onScrollToServices={handleScrollToServices}
          onScrollToRooms={handleScrollToRooms}
          onScrollToContact={handleScrollToContact}
        />
      </div>
    </Suspense>
  )
}

export default Home