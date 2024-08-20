import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; // Add this line to import your CSS
import Background from "./Background";
interface dataProps {
  heading: string;
  p: string;
}
const ImgSlider = () => {
 
    const [heroCount,setHeroCount] = useState(0);
    
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
      <Background stateValue={heroCount}/>
      <div 
      className="absolute top-20 left-[30%]">
      {heroCount === 0 && (
          <motion.div 
          initial={{opacity: 0, x: -200}}
          whileInView={{opacity:1, x:0}}
          transition={{duration: 1, delay: 0.3}}
          className="flex flex-col items-center justify-center gap-8 uppercase ml-16">
            <h1 className=" text-yellow-400 text-xl tracking-wider ">{data[0].heading}</h1>
            <p className=" text-[3rem] sm:text-[2rem] text-white tracking-[0.03rem] leading-tight text-wrap">A special place where <br /> you can stay and relax</p>
            <Link to={"#"} className=" py-4 sm:py-3 sm:text-base flex items-center justify-center bg-yellow-500 w-44 text-xl tracking-wider text-gray-900">Book Now</Link>
            </motion.div>
        )}
        {
          heroCount === 1 && (
            <motion.div 
            initial={{opacity: 0, x: -200}}
            whileInView={{opacity:1, x:0}}
            transition={{duration: 1, delay: 0.3}}
             className="flex flex-col items-center justify-center gap-8 uppercase -ml-0">
            <h1 className=" text-yellow-400 text-xl tracking-wider">{data[1].heading}</h1>
            <p className=" text-[3rem] sm:text-[2rem] text-white tracking-[0.03rem] leading-tight text-wrap">We provide comfortable <br /> accommodation for you</p>
            <Link to={"#"} className=" py-4 sm:py-3 sm:text-base flex items-center justify-center bg-yellow-500 w-44 text-xl tracking-wider text-gray-900">Book Now</Link>
            </motion.div>
            
        )}
        {
          heroCount === 2 && (
            <motion.div 
      initial={{opacity: 0, x: -200}}
      whileInView={{opacity:1, x:0}}
      transition={{duration: 1, delay: 0.3}}
            className="flex flex-col items-center justify-center gap-8 uppercase -ml-8">
            <h1 className=" text-yellow-400 text-xl tracking-wider">{data[2].heading}</h1>
            <p className=" text-[3rem] sm:text-[2rem] text-white tracking-[0.03rem] leading-tight text-wrap">Take advantage of the budget <br /> oriented accommodation</p>
              <Link to={"#"} className=" py-4 sm:py-3 sm:text-base flex items-center justify-center bg-yellow-500 w-44 text-xl  tracking-wider text-gray-900">Book Now</Link>
              </motion.div>
        )}
      </div>
      <div className="flex flex-col gap-4 absolute top-48 right-4">
       <div className={`h-3 w-3 bg-gray-400 cursor-pointer hover:bg-yellow-400 hover:transition-all hover:duration-300 ${heroCount===0? "bg-yellow-400":""}`} onClick={()=>setHeroCount(0)}></div>
       <div className={`h-3 w-3 bg-gray-400 cursor-pointer hover:bg-yellow-400 hover:transition-all hover:duration-300 ${heroCount===1? "bg-yellow-400":""}`} onClick={()=>setHeroCount(1)}></div>
       <div className={`h-3 w-3 bg-gray-400 cursor-pointer hover:bg-yellow-400 hover:transition-all hover:duration-300 ${heroCount===2? "bg-yellow-400":""}`} onClick={()=>setHeroCount(2)}></div>
      </div>
      </div>
    );
}

export default ImgSlider;
