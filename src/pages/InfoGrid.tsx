import { IoMapOutline } from 'react-icons/io5';
import { LiaHomeSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { InfoCard } from '../components/Cards';

const InfoGrid = () => {
    return (
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-sm:px-16 gap-8 px-28 sm:px-8 mt-10">
        <InfoCard 
          icon={<IoMapOutline className="text-[50px]" />}
          title="Map & Directions"
          description="Our hostel is located in the downtown and not too far from airport and bus station so it is quite easy to find us wherever you come from."
        />
        <InfoCard 
          icon={<LiaHomeSolid className="text-[50px]" />}
          title="Accommodation services"
          description="Visit Hostel provides high-quality accommodation services to clients that come to our city from all over the world throughout the year."
        />
        <InfoCard 
          icon={<FaRegStar className="text-[50px]" />}
          title="Great Experience"
          description="With qualified and friendly staff and high level of comfort, we are sure you will have a great experience of staying at the Visit Hostel."
        />
      </div>
    );
  };
  
  export default InfoGrid;