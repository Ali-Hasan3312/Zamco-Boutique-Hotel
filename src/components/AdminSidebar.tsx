import { useEffect, useState } from 'react'
import { AiFillFileText } from 'react-icons/ai'
import { FiShoppingCart } from "react-icons/fi"
import { HiMenuAlt4 } from 'react-icons/hi'
import { IoMdMail } from 'react-icons/io'
import { RiHotelBedLine } from "react-icons/ri"
import { TfiDashboard } from "react-icons/tfi"
import { Link, useLocation } from 'react-router-dom'
const AdminSideBar = () => {
    const location = useLocation()
    
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return (
    <>
     {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)} className=' grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-blue-500 bg-opacity-100 fixed top-4 left-4 text-3xl bg-white rounded-full z-[9]'>
          <HiMenuAlt4 />
        </button>
      )}
   <aside className='bg-white text-white p-4 z-10 overflow-y-auto overflow-hidden'  style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }>
   <div className=' text-gray-800 flex items-center justify-center gap-4'>
  <div>
  <img src='https://techydevs.com/demos/themes/html/trizen-demo/html/images/team8.jpg' className=' h-16 w-16 rounded-full'/>
  </div>
  <div className='flex flex-col gap-1'>
    <span className='text-xl font-semibold'>Usman</span>
    <span className='text-sm'>Manager</span>
  </div>
   </div>
    <div className='mt-8 mx-4'>
       
        
        <ul className=''>
            <li  className=''>
                <Link to={"/admin/dashboard"} className={`flex content-center  mx-auto text-lg items-center gap-3 text-opacity-85 hover:bg-custom-blue hover:text-white transition-all duration-300 py-2 w-[200px] px-3 ${location.pathname==='/admin/dashboard'? 'bg-custom-blue text-white' : 'text-gray-800'}`}>
                <TfiDashboard />
                    Dashboard
                </Link>

            </li>
            <li className='my-2'>
                <Link to={"/admin/mails"} className={`flex content-center  mx-auto text-lg items-center gap-3 text-opacity-85 hover:bg-custom-blue hover:text-white transition-all duration-300 py-2 w-[200px] px-3 ${location.pathname==='/admin/mails'? 'bg-custom-blue text-white' : 'text-gray-800'}`}>
                <IoMdMail />
                Mails
                </Link>
            </li>
            <li className='my-2'>
                <Link to={"/admin/bookings"} className={`flex content-center mx-auto text-lg items-center gap-3 text-opacity-85 hover:bg-custom-blue hover:text-white transition-all duration-300 py-2 w-[200px] px-3 ${location.pathname==='/admin/bookings'? 'bg-custom-blue text-white' : 'text-gray-800'}`}>
                <FiShoppingCart />
                Bookings
                </Link>
            </li>
            <li className='my-2'>
                <Link to={"/admin/rooms"} className={`flex content-center mx-auto text-lg items-center gap-3 text-opacity-85 hover:bg-custom-blue hover:text-white transition-all duration-300 py-2 w-[200px] px-3 ${location.pathname==='/admin/rooms'? 'bg-custom-blue text-white' : 'text-gray-800'}`}>
                <RiHotelBedLine />
                Rooms
                </Link>
            </li>
           
            <li className='my-2'>
                <Link to={"/admin/transactions"} className={`flex content-center mx-auto text-lg items-center gap-3 text-opacity-85 hover:bg-custom-blue hover:text-white transition-all duration-300 py-2 w-[200px] px-3 ${location.pathname==='/admin/transactions'? 'bg-custom-blue text-white' : 'text-gray-800'}`}>
                <AiFillFileText />
                Transactions
                </Link>
            </li>

        </ul>
       
    </div>
   
    
    {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)} className=' w-[80%] my-4 mx-auto block p-3 border-none outline-none cursor-pointer bg-red-500 text-white rounded-lg'>
            Close
          </button>
        )}
   </aside>
   </>
  )
}






export default AdminSideBar