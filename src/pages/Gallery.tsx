import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DinningRoom1 from "../assets/Our Gallery/DinningRoom1.jpg"
import DinningRoom2 from "../assets/Our Gallery/DinningRoom2.jpg"
import Gallery1 from "../assets/Our Gallery/Gallery1.jpg"
import Gallery2 from "../assets/Our Gallery/Gallery2.jpg"
import BedRoom1 from "../assets/Our Gallery/Room1.jpg"
import BedRoom2 from "../assets/Our Gallery/Room2.jpg"
import BedRoom3 from "../assets/Our Gallery/Room3.jpg"
import BedRoom4 from "../assets/Our Gallery/Room4.jpg"
import BedRoom5 from "../assets/Our Gallery/Room5.jpg"
import LivingRoom1 from "../assets/Our Gallery/livingRoom1.jpg"
import LivingRoom2 from "../assets/Our Gallery/livingRoom2.jpg"
import LivingRoom3 from "../assets/Our Gallery/livingRoom3.jpg"
import GalleryProps from '../components/GalleryProps'
interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {}
const Gallery = forwardRef<HTMLDivElement, GalleryProps>((props, ref) => {
  props
  const [all, setAll] = useState(true)
  const [bedrooms, setBedrooms] = useState(false)
  const [livingrooms, setLivingRooms] = useState(false)
  const [dinningRooms, setDinningRooms] = useState(false)
  const bedRoomHandler = ()=>{
    setBedrooms(true);
    setLivingRooms(false);
    setDinningRooms(false);
    setAll(false);
  }
  const allRoomHandler = ()=>{
    setBedrooms(false);
    setLivingRooms(false);
    setDinningRooms(false);
    setAll(true);
  }
  const livingRoomHandler = ()=>{
    setBedrooms(false);
    setLivingRooms(true);
    setDinningRooms(false);
    setAll(false);
  }
  const dinningRoomHandler = ()=>{
    setBedrooms(false);
    setLivingRooms(false);
    setDinningRooms(true);
    setAll(false);
  }
  
  
 
  return (

    <div ref={ref} className=' mt-12' id='gallery'>
       <div className='flex flex-col font-semibold gap-2 items-center justify-center'>
       <h1 className=' text-center text-2xl max-sm:text-xl uppercase'>Our Gallery</h1>
        <div className='flex items-center justify-center gap-8 text-sm max-sm:text-[12px] mt-2 max-sm:px-2 max-sm:gap-4 text-nowrap'>
            <Link to={"#"} className={` uppercase ${all? "text-custom-yellow" : "text-gray-400"}`} onClick={allRoomHandler}>All</Link>
            <div className=' border h-4 border-r border-gray-400 '></div>
            <Link to={"#"} className={` tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300 ${bedrooms? "text-custom-yellow" : "text-gray-400"}`} onClick={bedRoomHandler}>Bedrooms</Link>
            <div className=' border h-4 border-r border-gray-400'></div>
            <Link to={"#"} className={`tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300 ${livingrooms? "text-custom-yellow" : "text-gray-400"}`} onClick={livingRoomHandler}>living rooms</Link>
            <div className=' border h-4 border-r border-gray-400'></div>
            <Link to={"#"} className={`tracking-wide uppercase hover:text-custom-yellow hover:transition-all hover:duration-300 ${dinningRooms? "text-custom-yellow" : "text-gray-400"}`} onClick={dinningRoomHandler}>Dining rooms</Link>
        </div>
       </div>
       <div className='grid grid-cols-4 gap-3 mt-10 ml-8 max-sm:ml-0 max-sm:grid-cols-1 max-sm:px-16'>
       {all && (
      <>
       <GalleryProps to='#' image={Gallery1} room={"Gallery1"}  />
       <GalleryProps to='#' image={Gallery2} room={"Gallery2"} />
       <GalleryProps to='#' image={DinningRoom1} room={"DinningRoom1"} />
       <GalleryProps to='#' image={DinningRoom2} room={"DinningRoom2"} />
       <GalleryProps to='#' image={BedRoom1} room={"BedRoom1"} />
       <GalleryProps to='#' image={BedRoom2} room={"BedRoom2"} />
       <GalleryProps to='#' image={BedRoom3} room={"BedRoom3"} />
       <GalleryProps to='#' image={BedRoom4} room={"BedRoom4"} />
       <GalleryProps to='#' image={BedRoom5} room={"BedRoom5"} />
       <GalleryProps to='#' image={LivingRoom1} room={"LivingRoom1"} />
       <GalleryProps to='#' image={LivingRoom2} room={"LivingRoom2"} />
       <GalleryProps to='#' image={LivingRoom3} room={"LivingRoom3"} />
       </>
      )}
       {bedrooms && (

      <>
       <GalleryProps to='#' image={BedRoom1} room={"BedRoom1"} />
       <GalleryProps to='#' image={BedRoom2} room={"BedRoom2"} />
       <GalleryProps to='#' image={BedRoom3} room={"BedRoom3"} />
       <GalleryProps to='#' image={BedRoom4} room={"BedRoom4"} />
       <GalleryProps to='#' image={BedRoom5} room={"BedRoom5"} />
       
       </>
      )}
       {dinningRooms && (

<>

 <GalleryProps to='#' image={DinningRoom1} room={"DinningRoom1"} />
 <GalleryProps to='#' image={DinningRoom2} room={"DinningRoom2"} />
 
 </>
)} {livingrooms && (

  <>
   
   <GalleryProps to='#' image={LivingRoom1} room={"LivingRoom1"} />
   <GalleryProps to='#' image={LivingRoom2} room={"LivingRoom2"} />
   <GalleryProps to='#' image={LivingRoom3} room={"LivingRoom3"} />
   </>
  )}
    </div>
    </div>
  )
})

export default Gallery
