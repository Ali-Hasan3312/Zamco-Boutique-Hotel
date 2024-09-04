import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RiHotelBedLine } from "react-icons/ri";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import AdminSideBar from "../components/AdminSidebar";
import { BookingBarChart, EarningsPieChart, ReviewsBarChart } from "../components/charts";
export interface BookingStats {
  month: string;
  totalBookings: number;
}
export interface DashboardStats {
  availableRoomsCount: number;
  bookingsCount: number;
  tenMonthsBookings: BookingStats;
  thisMonthRevenue: number;
  thisweekBookings: number;
  todayBookings: number;
}
const Dashboard = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/stats`);
              setData(response.data.stats);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
  }, []);
 
  
  return (
    <div className='h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] lg:grid-cols-[20%_80%] sm:grid-cols-[1fr] gap-4 overflow-hidden'>
       <AdminSideBar />
       <div className="overflow-y-auto -ml-4">
        <div className="h-[350px] w-full relative bg-custom-blue">
        
       <div className="absolute top-2 left-4 flex items-center gap-28">
       <span className=" text-white  text-2xl">Zamco Botique Hotel</span>
       <div className="h-12 w-64 bg-white rounded-md flex items-center justify-between px-4 font-normal">
        <input type="text" placeholder="Search" className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none" />
        <VscSearch className=" z-20"/>
       </div>
      
       </div>
       <div className="flex items-center justify-between">
         <div className="text-white relative top-20 text-3xl font-semibold left-4">
         Hi, Usman Welcome Back!
          </div>
          <div className="h-14 w-[240px] relative top-20 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
          <Link to={"/"}>Home</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <span>My Dashboard</span>
         
          </div>
         </div>
        <div className="grid grid-cols-4">
          <div
          
          className="h-24 w-60 rounded-lg bg-white mt-28 ml-4 flex items-center justify-center gap-3">
            <motion.div
            whileHover={{scale:1.1}}
            className="h-16 w-16 rounded-2xl bg-custom-blue flex items-center justify-center text-white">
              <FiShoppingCart className=" text-2xl"/>
             
            </motion.div>
            <div className="flex flex-col">
            
                <span className=" text-lg">Total Booking</span>
                <span className=" font-semibold">{data?.bookingsCount}</span>
              
            </div>
          </div>
          <div className="h-24 w-60 rounded-lg bg-white mt-28 ml-4 flex items-center justify-center gap-3">
            <motion.div
            whileHover={{scale:1.1}}
            className="h-16 w-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white">
              <RiHotelBedLine className=" text-2xl"/>
             
            </motion.div>
            <div className="flex flex-col">
            
                <span className=" text-lg">Available Rooms</span>
                <span className=" font-semibold">{data?.availableRoomsCount}</span>
              
            </div>
          </div>
          <div className="h-24 w-60 rounded-lg bg-white mt-28 ml-4 flex items-center justify-center gap-3">
            <motion.div
            whileHover={{scale:1.1}}
            className="h-16 w-16 rounded-2xl bg-yellow-500 flex items-center justify-center text-white">
              <FaStar className=" text-2xl"/>
             
            </motion.div>
            <div className="flex flex-col">
            
                <span className=" text-lg">Total Reviews</span>
                <span className=" font-semibold">44</span>
              
            </div>
          </div>
          <div className="h-24 w-60 rounded-lg bg-white mt-28 ml-4 flex items-center justify-center gap-3">
            <motion.div
            whileHover={{scale:1.1}}
            className="h-16 w-16 rounded-2xl bg-green-600 flex items-center justify-center text-white">
              <AiFillDollarCircle className=" text-2xl"/>
             
            </motion.div>
            <div className="flex flex-col">
            
                <span className=" text-lg">Total Earnings</span>
                <span className=" font-semibold">{data?.thisMonthRevenue}$</span>
              
            </div>
          </div>
        </div>
      <div className="flex items-center gap-16">
      <BookingBarChart />
      <EarningsPieChart />
      </div>
      <div>
        <ReviewsBarChart />
      </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard