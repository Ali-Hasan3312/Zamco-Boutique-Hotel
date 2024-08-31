import AdminSideBar from "../components/AdminSidebar"
import { FiShoppingCart } from "react-icons/fi";
import { VscSearch } from "react-icons/vsc";
import { RiHotelBedLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import {BookingBarChart, EarningsPieChart, ReviewsBarChart} from "../components/charts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()
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
    <div className='h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] gap-4 overflow-hidden'>
       <AdminSideBar />
       <div className="overflow-y-auto -ml-4">
        <div className="h-[350px] w-full  relative bg-custom-blue">
        
       <div className="absolute top-2 left-4 flex items-center gap-28">
       <span className=" text-white  text-xl">Zamco Botique Hotel</span>
       <div className="h-12 w-64 bg-white rounded-md flex items-center justify-between px-4 font-normal">
        <input type="text" placeholder="Search" className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none" />
        <VscSearch className=" z-20"/>
       </div>
       <button
       onClick={()=>{
        
        navigate('/')
       }}
        className="h-12 w-32 ml-64 bg-red-600 rounded-md text-white font-semibold">Logout</button>
       </div>
        <div className=" text-white relative top-20 text-3xl font-semibold left-4">Hi, Usman Welcome Back!</div>
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