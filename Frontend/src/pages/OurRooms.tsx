import axios from "axios";
import { forwardRef, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import OurRoomProps from '../components/OurRoomProps';
import { Context } from "../main";

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
        const res = await axios.get(`http://localhost:4000/api/v1/room/getAll`, {
          withCredentials: true,
        });
        if(res.data){

          setRooms(res.data.rooms);
          
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    
    fetchAllRooms(); 
  }, [bookButton]); 

  
  
  
  return (
    <div ref={ref} id="rooms" className="mt-16">
      <h1 className="text-2xl text-center font-medium tracking-wide uppercase">
        our rooms
      </h1>
      {rooms.map((room) => (
        <OurRoomProps
        key={room._id}
          roomImage={room.photo}
          price={room.roomPrice.toString()}
          roomType={room.roomType}
          description={room.roomDescription}
          reviews={room.roomReviews.toString()}
          to={`${room._id}`}
        />
      ))}
      
      
      
    </div>
  );
});

export default OurRooms;
