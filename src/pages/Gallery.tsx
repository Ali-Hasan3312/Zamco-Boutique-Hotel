import { Link } from 'react-router-dom'
import image1 from "../assets/Rooms_pix/room1.jpg"
import image2 from "../assets/Rooms_pix/room2.jpg"
import image3 from "../assets/Rooms_pix/room3.jpg"
import image4 from "../assets/Rooms_pix/room4.jpg"
import image5 from "../assets/Rooms_pix/room5.jpg"
import image6 from "../assets/Rooms_pix/room6.jpg"
import image7 from "../assets/Rooms_pix/room7.jpg"
import image8 from "../assets/Rooms_pix/room8.jpg"
import GalleryProps from '../components/GalleryProps'

const Gallery = () => {
  

    
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
       <div className='grid grid-cols-4 gap-3 mt-10 ml-8'>
       <GalleryProps to='#' image={image1} room={1}  />
       <GalleryProps to='#' image={image2} room={2} />
       <GalleryProps to='#' image={image3} room={3} />
       <GalleryProps to='#' image={image4} room={4} />
       <GalleryProps to='#' image={image5} room={5} />
       <GalleryProps to='#' image={image6} room={6} />
       <GalleryProps to='#' image={image7} room={7} />
       <GalleryProps to='#' image={image8} room={8} />
    </div>
    </div>
  )
}

export default Gallery
