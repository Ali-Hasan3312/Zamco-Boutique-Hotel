import room1 from "../assets/Rooms_pix/room1.jpg"
import room2 from "../assets/Rooms_pix/room2.jpg"
import OurRoomProps from '../components/OurRoomProps'

const OurRooms = () => {
    

  return (
    <div className='mt-16'>
        <h1 className=' text-2xl text-center font-medium tracking-wide uppercase'>our rooms</h1>
       <OurRoomProps roomImage={room1} price='39' roomType='Double Room (Private)' description='Double room is one of the most popular choices at Visit Hostel. It includes one double bed with comfortable mattresses and bed linen, WC, and a TV set.' reviews='4 customer reviews' to='#' />
       <OurRoomProps roomImage={room2} price='20' roomType='Triple Room ' description='This room has three single beds, en-suite bathrooms, and card entry systems. It can be rented individually or for a company of three guests.' reviews='4 customer reviews' to='#' />
    </div>
  )
}

export default OurRooms