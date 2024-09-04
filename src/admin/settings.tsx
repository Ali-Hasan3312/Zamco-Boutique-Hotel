import { FaRegAddressBook } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { MdCall, MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import AdminSideBar from "../components/AdminSidebar";
const Settings = () => {
   return (
    <div className="h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] lg:grid-cols-[20%_80%] sm:grid-cols-[1fr] gap-4 overflow-hidden">
      <AdminSideBar />
      <div className="overflow-y-auto -ml-4">
        <div className="h-[350px] w-full relative bg-custom-blue">
          <div className="absolute top-2 left-4 flex items-center gap-28">
            <span className="text-white text-2xl">Zamco Boutique Hotel</span>
            <div className="h-12 w-64 bg-white rounded-md flex items-center justify-between px-4 font-normal">
              <input
                type="text"
                placeholder="Search"
                className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none"
              />
              <VscSearch className="z-10" />
            </div>
          </div>
         <div className="flex items-center justify-between">
         <div className="text-white relative top-20 text-3xl font-semibold left-4">
            Settings
          </div>
          <div className="h-14 w-[330px] relative top-20 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
          <Link to={"/"}>Home</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <span>Settings</span>
         
          </div>
         </div>
         <div className="grid grid-cols-2">
         <div className=" h-[660px] w-[530px] bg-white ml-8 rounded-md mt-32">
         <div className=" h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
         <h1>Personal Information</h1>
         </div>
         <div className="h-24 w-[90%] flex gap-8 mt-12 items-center mx-auto">
           <div>
           <img src="https://techydevs.com/demos/themes/html/trizen-demo/html/images/team8.jpg" className=" rounded-md" alt="User" />
           </div>
           <div className="flex flex-col gap-4 items-start w-[70%] justify-center">
            <p className="text-lg">Max file size is 5MB, Minimum dimension: 150x150 And Suitable files are .jpg & .png</p>
            <input type="file" />
            <button className="h-10 w-36 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Remove Image</button>
           </div>

         </div>
         <div className="mt-16 w-[90%] mx-auto grid grid-cols-2">
          <div className="flex flex-col gap-4">
            <label className="text-base">Full Name</label>
            <div className="relative w-full">
            <input type="text" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <LuUser2 className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Email Address</label>
            <div className="relative w-[100%]">
            <input type="email" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label className="text-base">Phone number</label>
            <div className="relative w-[100%]">
            <input type="text" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdCall className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label className="text-base">Date of birth</label>
            <div className="relative w-[100%]">
            <input type="date" className="h-12 appearance-none w-[220px] rounded-md border border-gray-300 outline-none px-2" />
            {/* <CiCalendarDate className="absolute left-2 top-4 text-gray-500 text-lg" /> */}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label className="text-base">Address</label>
            <div className="relative w-[100%]">
            <input type="text" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <FaRegAddressBook className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
            <button className="h-14 rounded w-36 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Save Changes</button>
          </div>
       
         </div>
          </div>
         <div className=" h-[500px] w-[530px] bg-white rounded-md mt-32">
         <div className=" h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
         <h1>Change Email</h1>
         </div>
       
         <div className="mt-8 w-[90%] mx-auto grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Current Email</label>
            <div className="relative w-[100%]">
            <input type="email" placeholder="Current email" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Email</label>
            <div className="relative w-[100%]">
            <input type="email" placeholder="New email" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Email Again</label>
            <div className="relative w-[100%]">
            <input type="email" placeholder="New email again" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
          <button className="h-14 rounded w-36 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Change Email</button>
         </div>
          </div>
         <div className=" h-[420px] w-[530px] bg-white ml-8 rounded-md mt-8">
         <div className=" h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
         <h1>Change Password</h1>
         </div>
       
         <div className="mt-8 w-[90%] mx-auto grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Current Password</label>
            <div className="relative w-[100%]">
            <input type="password" placeholder="Current password" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Password</label>
            <div className="relative w-[100%]">
            <input type="password" placeholder="New password" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Password Again</label>
            <div className="relative w-[100%]">
            <input type="password" placeholder="New password again" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
         </div>
          <button className="h-14 mt-6 ml-6 rounded w-40 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Change Password</button>
         <div className="h-12 mt-6"></div>
          </div>
         </div>
        </div>
      </div>
     
    </div>
  );
};

export default Settings;
