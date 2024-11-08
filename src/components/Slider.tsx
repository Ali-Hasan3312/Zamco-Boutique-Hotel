import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import '../App.css'; // Add this line to import your CSS
import { Context } from "../main";
import Background from "./Background";
interface dataProps {
  heading: string;
  p: string;
}
interface SliderProps {
  onScrollToRooms: () => void;     
}
const ImgSlider = ({onScrollToRooms }: SliderProps) => {
    const [heroCount,setHeroCount] = useState(0);
    const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [maxRooms, setMaxRooms] = useState<number>(1);
  const [maxAdults, setMaxAdults] = useState<number>(1);
  const [maxChildren, setMaxChildren] = useState<number>(0);
  const { 
    setrooms,
    setadults,
    setchildren, 
    setCheckOut,
    setCheckIn
   } = useContext(Context);
   
 setCheckOut(endDate);
 setCheckIn(startDate);
  const handleSearch = () => {
    setrooms(maxRooms);
    setadults(maxAdults);
    setchildren(maxChildren);
    onScrollToRooms();
  };
  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value ? new Date(event.target.value) : null);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value ? new Date(event.target.value) : null);
  };
    const data: dataProps[] = [
        {
           
            heading: "Welcome to Zamco Boutique Hotel",
            p: `A special place where you can stay and relax`,
           
        },
        {
          
            heading: "Serving travelers on a budget",
            p: `We provide comfortable accommodation for you`,
           
        },
        {
           
            heading: "A perfect and affordable place to stay",
            p: `Take advantage of the budget-oriented accommodation`,
           
        },
        
    ];
    
    useEffect(()=>{
      setInterval(()=>{
        setHeroCount((prev)=>{
         return prev===2? 0 : prev+1
        })
        },5000)
    },[])

    return (
      <div className="relative">
      <Background stateValue={heroCount} />
      <div 
      className="absolute lg:top-20 top-52 w-[98%] mx-auto">
      {heroCount === 0 && (
          <motion.div
          initial={{opacity: 0, x: -200}}
          whileInView={{opacity:1, x:0}}
          transition={{duration: 1, delay: 0.3}}
          className="flex flex-col items-center justify-center gap-8 uppercase">
            <h1 className=" text-yellow-400 lg:text-xl text-3xl tracking-wider text-nowrap">{data[0].heading}</h1>
            <p className=" lg:text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap text-[60px]">A special place where <br /> you can stay and relax</p>
            <button onClick={onScrollToRooms} className=" py-4 max-md:text-sm max-md:py-2 max-md:w-28 flex items-center justify-center bg-yellow-500 w-44 text-3xl lg:text-xl tracking-wider text-gray-900">Book Now</button>
            </motion.div>
        )}
        {
          heroCount === 1 && (
            <motion.div 
            initial={{opacity: 0, x: -200}}
            whileInView={{opacity:1, x:0}}
            transition={{duration: 1, delay: 0.3}}
             className="flex flex-col items-center justify-center gap-8 uppercase">
            <h1 className=" text-yellow-400 lg:text-xl text-3xl tracking-wider text-nowrap">{data[1].heading}</h1>
            <p className=" lg:text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap text-[60px]">We provide comfortable <br /> accommodation for you</p>
            <button onClick={onScrollToRooms} className=" py-4 max-sm:text-sm max-sm:py-2 max-sm:w-28 flex items-center justify-center bg-yellow-500 w-44 text-3xl lg:text-xl tracking-wider text-gray-900">Book Now</button>
            </motion.div>
        )}
        {
          heroCount === 2 && (
            <motion.div 
      initial={{opacity: 0, x: -200}}
      whileInView={{opacity:1, x:0}}
      transition={{duration: 1, delay: 0.3}}
            className="flex flex-col items-center justify-center gap-8 uppercase">
            <h1 className=" text-yellow-400 lg:text-xl text-3xl tracking-wider text-nowrap">{data[2].heading}</h1>
            <p className=" lg:text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap text-[56px]">Take advantage of the budget <br /> oriented accommodation</p>
              <button onClick={onScrollToRooms}  className=" py-4 max-sm:text-sm max-sm:py-2 max-sm:w-28 flex items-center justify-center bg-yellow-500 w-44 text-3xl lg:text-xl  tracking-wider text-gray-900">Book Now</button>
              </motion.div>
        )}
      </div>
      <div className=" w-[85%] px-4 mx-auto lg:h-[112px] lg:flex-row lg:w-[95%] lg:gap-4 lg:top-[450px] left-1/2 -translate-x-1/2 lg:pt-2 lg:-bottom-0 h-[950px] sm:flex-col sm:pt-2 bg-white absolute shadow-md -bottom-[646px] flex items-center justify-center gap-12">
        <div className="flex flex-col gap-4 lg:gap-1">
          <label className=" font-medium text-4xl lg:text-base">Check In</label>
          <input type="date"
           value={startDate ? startDate.toISOString().split('T')[0] : ''}
           onChange={handleStartDateChange}
          className=" lg:h-10 h-16 lg:w-48 w-[760px] px-2 border border-gray-300 text-4xl lg:text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium text-4xl lg:text-base">Check Out</label>
          <input type="date"
           value={endDate ? endDate.toISOString().split('T')[0] : ''}
           onChange={handleEndDateChange}
          className=" lg:h-10 h-16 lg:w-48 w-[760px] px-4 border border-gray-300 text-4xl lg:text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium text-4xl lg:text-base">Rooms</label>
          <select className="border border-gray-300 outline-none lg:h-10 px-4 h-16 text-4xl lg:text-sm w-[760px]  lg:w-48"
          onChange={(event)=>setMaxRooms(parseInt(event.target.value))}
          >
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium text-4xl lg:text-base">Adult</label>
          <select className="border border-gray-300 outline-none lg:h-10 h-16 text-4xl lg:text-sm w-[760px] px-4  lg:w-48"
          onChange={(event)=> setMaxAdults(parseInt(event.target.value))}
          >
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium text-4xl lg:text-base">Children</label>
          <select className="border border-gray-300 outline-none lg:h-10 h-16 text-4xl lg:text-sm w-[760px] px-4  lg:w-48"
          onChange={(event)=> setMaxChildren(parseInt(event.target.value))}
          >
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
          </select>
        </div>
        <div className="py-4 lg:py-2 w-[760px] px-4 text-4xl lg:text-base bg-custom-yellow mt-6 flex items-center justify-center text-white hover:shadow-lg hover:bg-white hover:text-black transition-all duration-500 cursor-pointer lg:w-36">
          <button 
          onClick={handleSearch}
          className=" text-nowrap"
          >Check Availability</button>
        </div>
      </div>
      </div>
    );
}

export default ImgSlider;
