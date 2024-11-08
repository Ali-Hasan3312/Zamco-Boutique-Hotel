import { IoMapOutline } from 'react-icons/io5';
import { LiaHomeSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { InfoCard } from '../components/Cards';

const InfoGrid = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:px-10 lg:mt-32 px-10 mt-[720px] gap-8">
        <InfoCard 
          icon={<IoMapOutline className="text-[50px]" />}
          title="Map & Directions"
          to='https://g.co/kgs/Y9cgy1y'
          description="Our hotel is located in the Icherisheher and not too far from railway station so it is quite easy to find us wherever you come from."
        />
        <InfoCard 
          icon={<LiaHomeSolid className="text-[50px]" />}
          title="Accommodation services"
          to='/services'
          description="Zamco Hotel provides high-quality accommodation services to clients that come to our city from all over the world throughout the year."
        />
        <InfoCard 
          icon={<FaRegStar className="text-[50px]" />}
          title="Great Experience"
          to='#'
          description="With qualified and friendly staff and high level of comfort, we are sure you will have a great experience of staying at the Zamco Boutique Hotel."
        />
      </div>
    );
  };
  
  export default InfoGrid;