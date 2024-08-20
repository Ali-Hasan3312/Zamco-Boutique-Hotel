import { lazy, Suspense } from 'react'
import Footer from '../components/Footer'
const Navbar = lazy(()=> import("../components/navbar"))
const InfoGrid = lazy(()=> import('./InfoGrid'))
const Gallery = lazy(()=> import('./Gallery'))
const Services = lazy(()=> import('./Services'))
const ImgSlider = lazy(()=> import('../components/Slider'))
const OurRooms = lazy(()=> import('./OurRooms'))
const Loader = lazy(() => import("../components/Loader"));
const SignUp = lazy(() => import("../components/SignUp"));
const GallerSlider = lazy(() => import("../components/GallerySlider"));
const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
       <div className=' overflow-x-hidden'>
       <Navbar />
        <ImgSlider />
        <InfoGrid />
        <Gallery />
        <Services />
        <OurRooms />
        <SignUp />
        <GallerSlider />
        <Footer />
       </div>
    </Suspense>
  )
}

export default Home