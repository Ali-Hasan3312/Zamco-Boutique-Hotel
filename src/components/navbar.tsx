import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoLogoGoogleplus } from "react-icons/io";
import { IoCall, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/Zamco_logo.jpg";
import { FadeRight } from "../utils/animation";

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
      className="relative h-fit w-fit lg:text-lg"
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
          className="bg-white p-4 z-10 absolute top-[160px] overflow-hidden"
          initial="hidden"
          whileInView={"visible"}
          variants={FadeRight(0.2)}
        >
          <div className="flex flex-col items-center text-black gap-12 sm:gap-4">
            <NavItem>Home</NavItem>
            <NavItem onClick={onScrollToRooms}>Rooms</NavItem>
            <NavItem onClick={onScrollToServices}>Amenities & Services</NavItem>
            <NavItem onClick={onScrollToGallery}>Our Gallery</NavItem>
            <NavItem onClick={onScrollToContact}>Contact Us</NavItem>
            <NavItem to="/admin">Dashboard</NavItem>
          </div>
        </motion.aside>
      )}

      <div className="">
        <div className="h-[100px] w-full flex items-center justify-between px-32 max-sm:px-2 max-sm:h-24">
          <div>
            <div className="h-16 w-36 text-4xl max-sm:h-8 max-sm:w-20 max-sm:text-lg max-sm:gap-2 cursor-pointer tracking-wide text-gray-800 flex items-center text-nowrap gap-4">
              <img src={logo} className="object-cover" alt="" />
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
            

           
          </div>
        </div>
        <nav
          className={`sticky top-0 z-50 h-16 w-full sm:text-sm sm:px-4 sm:text-nowrap bg-custom-nav text-white text-xl flex items-center justify-between px-16 tracking-wider ${
            phoneActive ? "justify-center" : ""
          }`}
        >
          {phoneActive ? (
            isOpen ? (
              <button
                id="hamburger"
                onClick={() => setIsOpen(false)}
                className="grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-white bg-opacity-100 absolute top-[10%] left-4 text-3xl bg-inherit rounded-full z-[9]"
              >
                <IoClose />
              </button>
            ) : (
              <button
                id="hamburger"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="grid place-items-center h-12 w-12 border-none outline-none cursor-pointer text-white bg-opacity-100 absolute top-[10%] left-4 text-3xl bg-inherit rounded-full z-[9]"
              >
                <HiMenuAlt4 />
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
          {phoneActive && <div></div>}
          <div className="flex items-center gap-8 lg:gap-8 lg:text-lg sm:gap-4">
            <Link to={"/admin"} className="h-10 w-32 bg-custom-yellow flex items-center justify-center rounded-md text-black">Dashboard</Link>
            <Link to={"https://www.facebook.com"}>
              <FaFacebookF className="cursor-pointer hover:text-yellow-400 hover:transition-all duration-300" />
            </Link>
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
    </>
  );
};

export default Navbar;
