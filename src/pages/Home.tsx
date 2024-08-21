import { lazy, Suspense } from 'react'
import ContactUs from '../components/ContactUs'

const InfoGrid = lazy(()=> import('./InfoGrid'))
const Gallery = lazy(()=> import('./Gallery'))
const Services = lazy(()=> import('./Services'))

const OurRooms = lazy(()=> import('./OurRooms'))
const Loader = lazy(() => import("../components/Loader"));
const SignUp = lazy(() => import("../components/SignUp"));
const GallerSlider = lazy(() => import("../components/GallerySlider"));
const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
       <div className=' overflow-x-hidden'>
      
       
        <InfoGrid />
        <Gallery />
        <Services />
        <OurRooms />
        <SignUp />
        <GallerSlider />
        <ContactUs />
       
       </div>
    </Suspense>
  )
}

export default Home