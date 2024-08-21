import { useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoGoogleplus } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/Zamco_logo.jpg";
interface NavItemProps{
  to: string;
  children: React.ReactNode;
  menuItems?: { label: string; to: string }[];
  scrollTo?:  ()=> void 
  

}
const NavItem = ({ to, children, menuItems, scrollTo }:NavItemProps) => {
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
              onClick={() => scrollTo}
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
  
 
 

  return (
    <div className="">
      <div className=" h-36 w-full flex py-2 items-center justify-between px-32 max-sm:px-2 max-sm:h-24">
        <div>
          <div className="h-16 w-44 text-4xl max-sm:h-8 max-sm:w-20 max-sm:text-lg max-sm:gap-2 cursor-pointer tracking-wide text-gray-800 flex items-center text-nowrap gap-4">
            <img src={logo} className=" object-cover" alt="" />
          </div>
        </div>
        <div className="flex items-center text-xl text-nowrap tracking-wide gap-16 max-sm:gap-3 max-sm:text-sm">
          <div className="flex items-center gap-1">
            <IoCall className="text-yellow-500 opacity-70" />
            <span>+1 212 555 6688</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Fax:</span>
            <p className="font-normal">+1 212 555 6699</p>
          </div>
          <div className="">
            <Link to={"#"} className="h-12 w-32 py-2 px-4 max-sm:py-1 max-sm:px-1 max-sm:border max-sm:text-sm border-[3px] text-lg tracking-wider hover:bg-yellow-300 hover:transition-all duration-300 hover:text-white border-black text-nowrap">
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <nav className="sticky top-0 z-50 h-16 w-full max-sm:text-sm max-sm:px-4 max-sm:text-nowrap bg-custom-nav text-white text-xl flex items-center justify-between px-16 tracking-wider">
        <div className="flex items-center gap-12 max-sm:gap-4">
          <NavItem  to="/">Home</NavItem>
          <NavItem  to="/rooms#rooms" >Rooms</NavItem>
          <NavItem to="/contact#contact">Contact us</NavItem>
          <NavItem to="/services#services">Amenities & Services</NavItem>
          
        </div>
        <div className="flex items-center gap-8 max-sm:gap-4">
          <Link to={"https://www.facebook.com"}><FaFacebookF className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" /></Link>
          <Link to={"https://www.twitter.com"}>
          <FaTwitter className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
          </Link>
          <Link to={"https://www.google.com"}>
          <IoLogoGoogleplus className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300 text-2xl max-sm:text-lg" />
          </Link>
          <Link to={"https://www.instagram.com"}>
          <FiInstagram className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
