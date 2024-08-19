import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/Zamco_logo.jpg";
import { useState } from "react";

interface NavItemProps{
  to: string;
  children: React.ReactNode;
  menuItems?: { label: string; to: string }[];
}
const NavItem = ({ to, children, menuItems }:NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-fit w-fit"
    >
      <Link to={to}>
        <span
          style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -top-2 -left-2 -right-2 h-1 origin-left rounded-full bg-yellow-400 transition-transform duration-300 ease-out"
        ></span>
        {children}
      </Link>
       
        {menuItems && menuItems.length > 0 && (
        <div
          className="absolute top-7 -left-6 bg-white text-black py-2 rounded shadow-md transition-opacity duration-300"
          style={{ opacity: isHovered ? "1" : "0", pointerEvents: isHovered ? "auto" : "none" }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
const Navbar = () => {
  const roomsMenu = [
    { label: "Room 1", to: "/room1" },
    { label: "Room 2", to: "/room2" },
    { label: "Room 3", to: "/room3" },
  ];
  const aboutMenu = [
    { label: "Amenities & Services", to: "#" },
    { label: "Dinning", to: "#" },
    { label: "Wellness", to: "#" },
    { label: "Local Activities", to: "#" },
  ]

  return (
    <div className="">
      <div className=" h-24 w-full flex py-2 items-center justify-between px-32">
        <div>
          <div className="h-16 w-28 text-4xl cursor-pointer tracking-wide text-gray-800 flex items-center text-nowrap gap-4">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="flex items-center text-xl tracking-wide gap-16">
          <div className="flex items-center gap-1">
            <IoCall className="text-yellow-500 opacity-70" />
            <span>+1 212 555 6688</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Fax:</span>
            <p className="font-normal">+1 212 555 6699</p>
          </div>
          <div className="">
            <button className="h-12 w-32 border-[3px] text-lg tracking-wider hover:bg-yellow-300 hover:transition-all duration-300 hover:text-white border-black text-nowrap">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-50 h-16 w-full bg-custom-nav text-white text-xl flex items-center justify-between px-16 tracking-wider">
        <div className="flex items-center gap-12">
          <NavItem to="/">Home</NavItem>
          <NavItem to="#" menuItems={aboutMenu} >About Us</NavItem>
          <NavItem to="#" menuItems={roomsMenu} >Rooms</NavItem>
          <NavItem to="#">Contact us</NavItem>
         
        </div>
        <div className="flex items-center gap-8">
          <FaFacebookF className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
          <FaTwitter className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
          <IoLogoGoogleplus className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300 text-2xl" />
          <FiInstagram className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
