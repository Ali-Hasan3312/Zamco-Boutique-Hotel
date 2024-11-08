import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoCall, IoClose } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";
import logo from "../assets/Zamco_logo.jpg";
interface NavItemProps {
  to?: string;
  children: React.ReactNode;
  menuItems?: { label: string; to: string }[];
  tagId?: string;
  onClick?: () => void;
}
const NavItem = ({ to, children, menuItems, onClick }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-fit w-fit lg:text-lg sm:text-xl"
    >
      <Link to={to || "#"} onClick={handleClick}>
        <span
          style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
          className="absolute -top-2 -left-2 -right-2 h-1 origin-left rounded-full bg-yellow-400 transition-transform duration-300 ease-out"
        ></span>
        {children}
      </Link>
      {menuItems && menuItems.length > 0 && (
        <div
          className="absolute top-7 -left-6 bg-white text-black py-2 rounded shadow-md transition-opacity duration-300"
          style={{
            opacity: isHovered ? "1" : "0",
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
              onClick={handleClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface NavbarProps {
  onScrollToContact: () => void;
  onScrollToGallery: () => void;
  onScrollToServices: () => void;
  onScrollToRooms: () => void;
}

const Navbar = ({
  onScrollToContact,
  onScrollToGallery,
  onScrollToServices,
  onScrollToRooms,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("click", handleCloseMenu);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <motion.aside
        className="fixed top-0 left-0 h-full w-3/4 bg-white z-[2000] p-6 flex flex-col gap-6"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleCloseMenu}
          className="self-end text-5xl text-gray-600"
        >
          <IoClose />
        </button>
        <div className="flex flex-col items-start text-black gap-6">
          <NavItem>
           <span className=" text-3xl">Home</span> 
          </NavItem>
          <NavItem onClick={onScrollToRooms}>
          <span className=" text-3xl">Rooms</span> 
          </NavItem>
          <NavItem onClick={onScrollToServices}>
           <span className=" text-3xl"> Amenities & Services</span>
          </NavItem>
          <NavItem onClick={onScrollToGallery}>
            <span className=" text-3xl">Our Gallery</span>
          </NavItem>
          <NavItem onClick={onScrollToContact}>
            <span className=" text-3xl">Contact Us</span>
          </NavItem>
        </div>
      </motion.aside>
      )}
      <div className="">
        <div className="lg:h-[100px] h-32 w-full flex items-center justify-between lg:px-32 px-8">
          <div>
            <div className="h-16 w-36 text-4xl max-sm:h-8 max-sm:w-20 max-sm:text-lg max-sm:gap-2 cursor-pointer tracking-wide text-gray-800 flex items-center text-nowrap gap-4">
              <img src={logo} className="object-cover" alt="" />
            </div>
          </div>
          <div className="flex items-center text-xl text-nowrap tracking-wide gap-16 max-sm:gap-3 max-sm:text-sm">
            <div className="flex items-center gap-1">
              <IoCall className="text-yellow-500 opacity-70" />
              <span>+994552390083</span>
            </div>
          </div>
        </div>
        <nav
          className={`sticky top-0 z-50 h-24 lg:h-16 w-full text-sm px-4 sm:text-nowrap bg-custom-nav text-white md:text-xl flex items-center justify-between md:px-16 tracking-wider`}
        >
          {phoneActive ? (
            isOpen ? (
              <button
                id="hamburger"
                onClick={() => setIsOpen(false)}
                className="grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-white bg-opacity-100 absolute top-[22%] left-4 text-3xl bg-inherit rounded-full z-[9]"
              >
                <IoClose className="text-5xl" />
              </button>
            ) : (
              <button
                id="hamburger"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-white bg-opacity-100 absolute top-[22%] left-4 text-3xl bg-inherit rounded-full z-[9]"
              >
                <HiMenuAlt4 className="text-5xl" />
              </button>
            )
          ) : (
            <></>
          )}
          {!phoneActive && (
            <div className="flex items-center gap-12">
              <NavItem>Home</NavItem>
              <NavItem onClick={onScrollToRooms}>Rooms</NavItem>
              <NavItem onClick={onScrollToServices}>
                Amenities & Services
              </NavItem>
              <NavItem onClick={onScrollToGallery}>Our Gallery</NavItem>
              <NavItem onClick={onScrollToContact}>Contact Us</NavItem>
            </div>
          )}
          <div className={`flex items-center gap-8 lg:text-lg text-xl ${phoneActive? " absolute top-6 right-4" : ""}`}>
            <Link to={"/admin/dashboard"} className="lg:h-10 h-12 px-4 bg-custom-yellow flex items-center justify-center rounded-md text-black">Dashboard</Link>
            <Link to={"https://www.facebook.com"}>
              <FaFacebookF className="cursor-pointer lg:text-xl text-3xl hover:text-yellow-400 hover:transition-all duration-300" />
            </Link>
            <Link to={"https://chat.whatsapp.com"}>
              <SiWhatsapp className="cursor-pointer lg:text-xl text-3xl hover:text-yellow-400 hover:transition-all duration-300" />
            </Link>
            <Link to={"https://www.twitter.com"}>
              <FaTwitter className="cursor-pointer lg:text-xl text-3xl hover:text-yellow-400 hover:transition-all duration-300" />
            </Link>
            <Link to={"https://www.instagram.com"}>
              <FiInstagram className="cursor-pointer lg:text-xl text-3xl hover:text-yellow-400 hover:transition-all duration-300" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
