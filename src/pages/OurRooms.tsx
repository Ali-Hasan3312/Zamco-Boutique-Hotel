import room1 from "../assets/Our Gallery/Room1.jpg"
import room2 from "../assets/Our Gallery/Room2.jpg"
import room3 from "../assets/Our Gallery/Room3.jpg"
import room4 from "../assets/Our Gallery/Room4.jpg"
import room5 from "../assets/Our Gallery/Room5.jpg"
import livingRoom1 from "../assets/Our Gallery/livingRoom1.jpg"
import livingRoom2 from "../assets/Our Gallery/livingRoom2.jpg"
import livingRoom3 from "../assets/Our Gallery/livingRoom3.jpg"
import OurRoomProps from '../components/OurRoomProps'

const OurRooms = () => {
    

  return (
    <div id="rooms" className='mt-16'>
        <h1 className=' text-2xl text-center font-medium tracking-wide uppercase'>our rooms</h1>
       <OurRoomProps roomImage={room5} price='69' roomType='Triple Room ' description='This room has three single beds, en-suite bathrooms, and card entry systems. It can be rented individually or for a company of three guests.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={livingRoom3} price='20' roomType='Single Room ' description='This room has one single bed, en-suite bathroom, and card entry system. It can be rented individually or for a company of two guests.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={room1} price='59' roomType='Triple Room' description='This room has three single beds, en-suite bathrooms, and card entry systems. It can be rented individually or for a company of three guests.' reviews='4 customer reviews' to='#' />
       <OurRoomProps roomImage={room2} price='25' roomType='Single Room ' description='This room has one single bed, en-suite bathroom, and card entry system. It can be rented individually or for a company of two guests.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={room3} price='37' roomType='Double Room (Private) ' description='Double room is one of the most popular choices at Visit Hostel. It includes one double bed with comfortable mattresses and bed linen, WC, and a TV set.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={room4} price='22' roomType='Single Room' description='This room has one single bed, en-suite bathroom, and card entry system. It can be rented individually or for a company of two guests.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={livingRoom1} price='20' roomType='Triple Room ' description='This room has three single beds, en-suite bathrooms, and card entry systems. It can be rented individually or for a company of three guests.' reviews='5 customer reviews' to='#' />
       <OurRoomProps roomImage={livingRoom2} price='20' roomType='Double Room (Private)' description='Double room is one of the most popular choices at Visit Hostel. It includes one double bed with comfortable mattresses and bed linen, WC, and a TV set.' reviews='5 customer reviews' to='#' />
    </div>
  )
}

export default OurRooms