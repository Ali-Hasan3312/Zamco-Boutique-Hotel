import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; // Add this line to import your CSS
import Background from "./Background";
import { Context } from "../main";
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
    
   } = useContext(Context);
   
 setCheckOut(endDate)
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
      <Background />
      <div 
      className="absolute top-20 max-sm:top-32 w-full mx-auto">
      {heroCount === 0 && (
          <motion.div 
          initial={{opacity: 0, x: -200}}
          whileInView={{opacity:1, x:0}}
          transition={{duration: 1, delay: 0.3}}
          className="flex flex-col items-center justify-center gap-8 uppercase ml-16 max-sm:ml-0">
            <h1 className=" text-yellow-400 text-xl tracking-wider max-sm:text- max-sm:text-nowrap">{data[0].heading}</h1>
            <p className=" text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap max-sm:text-[22px]">A special place where <br /> you can stay and relax</p>
            <Link to={"#"} className=" py-4 max-sm:text-sm max-sm:py-2 max-sm:w-28 flex items-center justify-center bg-yellow-500 w-44 text-xl tracking-wider text-gray-900">Book Now</Link>
            </motion.div>
        )}
        {
          heroCount === 1 && (
            <motion.div 
            initial={{opacity: 0, x: -200}}
            whileInView={{opacity:1, x:0}}
            transition={{duration: 1, delay: 0.3}}
             className="flex flex-col items-center justify-center gap-8 uppercase -ml-0">
            <h1 className=" text-yellow-400 text-xl tracking-wider max-sm:text- max-sm:text-nowrap">{data[1].heading}</h1>
            <p className=" text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap max-sm:text-[22px]">We provide comfortable <br /> accommodation for you</p>
            <Link to={"#"} className=" py-4 max-sm:text-sm max-sm:py-2 max-sm:w-28 flex items-center justify-center bg-yellow-500 w-44 text-xl tracking-wider text-gray-900">Book Now</Link>
            </motion.div>
            
        )}
        {
          heroCount === 2 && (
            <motion.div 
      initial={{opacity: 0, x: -200}}
      whileInView={{opacity:1, x:0}}
      transition={{duration: 1, delay: 0.3}}
            className="flex flex-col items-center justify-center gap-8 uppercase -ml-8">
            <h1 className=" text-yellow-400 text-xl tracking-wider max-sm:text- max-sm:text-nowrap">{data[2].heading}</h1>
            <p className=" text-[3rem] text-white tracking-[0.03rem] leading-tight text-wrap max-sm:text-[22px]">Take advantage of the budget <br /> oriented accommodation</p>
              <Link to={"#"} className=" py-4 max-sm:text-sm max-sm:py-2 max-sm:w-28 flex items-center justify-center bg-yellow-500 w-44 text-xl  tracking-wider text-gray-900">Book Now</Link>
              </motion.div>
        )}
      </div>
      <div className="h-28 w-[80%] max-sm:h-[550px] max-sm:flex-col max-sm:gap-4 max-sm:top-[370px] max-sm:left-12 max-sm:pt-2 max-sm:-bottom-0 bg-white absolute shadow-md -bottom-[56px] left-32 flex items-center justify-center gap-8">
        <div className="flex flex-col gap-1">
          <label className=" font-medium">Check In</label>
          <input type="date"
           value={startDate ? startDate.toISOString().split('T')[0] : ''}
           onChange={handleStartDateChange}
          className=" h-10 w-48 px-2 border border-gray-300 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium">Check Out</label>
          <input type="date"
           value={endDate ? endDate.toISOString().split('T')[0] : ''}
           onChange={handleEndDateChange}
          className=" h-10 w-48 px-2 border border-gray-300 text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className=" font-medium">Rooms</label>
          <select className="border border-gray-300 text-sm outline-none h-10 max-sm:w-48"
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
          <label className=" font-medium">Adult</label>
          <select className="border border-gray-300 text-sm outline-none h-10 max-sm:w-48"
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
          <label className=" font-medium">Children</label>
          <select className="border border-gray-300 text-sm outline-none h-10 max-sm:w-48"
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
        <div className="h-10 w-60 bg-custom-yellow flex items-center justify-center text-white hover:shadow-lg hover:bg-white hover:text-black transition-all duration-500 cursor-pointer">
          <button 
          onClick={handleSearch}
          >Check Availability</button>
        </div>
      </div>
      </div>
    );
}

export default ImgSlider;
