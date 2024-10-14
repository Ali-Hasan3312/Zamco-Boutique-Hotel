import axios from "axios";
import { forwardRef, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import OurRoomProps from '../components/OurRoomProps';
import { Context } from "../main";
import Loader from "../components/Loader";

interface roomsProps extends React.HTMLAttributes<HTMLDivElement> {}
interface Room {
  _id: string;
  roomDescription: string;
  roomPrice: number;
  roomReviews: number;
  roomStatus: boolean;
  roomType: string;
  photo: string; 
}
const OurRooms = forwardRef<HTMLDivElement, roomsProps>((props, ref) => {
  props
  const [rooms, setRooms] = useState<Room[]>([]);
  const {bookButton} = useContext(Context)

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/room/getAll`, {
          withCredentials: true,
        });
        if(res.data){

          setRooms(res.data.rooms);
          
        }
      } catch (error: any) {
        toast.error(error.response.data.message!);
      }
    };

    
    fetchAllRooms(); 
  }, [bookButton]); 

  
  
  
  return (
    <div ref={ref} id="rooms" className="mt-16">
      <h1 className="text-2xl text-center font-medium tracking-wide uppercase">
        our rooms
      </h1>
      {rooms && rooms.length > 0 ? (
  rooms.map((room) => (
    <OurRoomProps
      key={room._id}
      roomImage={room.photo}
      price={room.roomPrice.toString()}
      roomType={room.roomType}
      description={room.roomDescription}
      reviews={room.roomReviews.toString()}
      to={`${room._id}`}
    />
  ))
) : (
  <Loader /> // Replace this with your actual loader component or spinner
)}
      
      
      
    </div>
  );
});

export default OurRooms;
