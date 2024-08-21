import { BsCupHot, BsPlug } from "react-icons/bs";
import { FaShower } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { MdLocalLaundryService, MdOutlineLockOpen } from "react-icons/md";
import { TbAirConditioning, TbToolsKitchen2 } from "react-icons/tb";
import ServicesProps from "../components/ServicesProps";
import { motion } from "framer-motion";
import { FadeUp } from "../utils/animation";


const Services = () => {
    
  return (
    <div id="services" className="mt-24">
        <h1 className=" text-2xl tracking-wide font-medium uppercase text-center">What we offer</h1>
        <motion.div className=" grid grid-cols-4 max-sm:grid-cols-2 gap-2 mt-10"
        variants={FadeUp(0.3)}
        initial="hidden"
        whileInView={"visible"}
        >
            <ServicesProps
            icon = {<BsCupHot className="text-custom-yellow text-[40px] opacity-85"/>}
            title="Tea & coffee"
            description="You can always have some hot coffee & tea in our kitchen, available to all our clients"
            />
            <ServicesProps
            icon = {<FaShower className="text-custom-yellow text-[40px] opacity-85"/>}
            title="hot showers"
            description="Visit Hostel is famous for clean and hot showers that you can have at any time of the day."
            />
            <ServicesProps
            icon = {<MdLocalLaundryService className="text-custom-yellow text-[40px] opacity-85"/>}
            title="Laundary"
            description="Need to quickly wash your clothes? Our laundry is always at your service."
            />
            <ServicesProps
            icon = {<TbAirConditioning className="text-custom-yellow text-[40px] opacity-85"/>}
            title="Air conditioning"
            description="All rooms at our hostel are equiped with reliable air conditioner systems."
            />
            <ServicesProps
            icon = {<FaWifi className="text-custom-yellow text-[40px] opacity-85"/>}
            title="free wi-fi"
            description="Our hostel is equipped with free high-speed Wi-Fi that is available 24/7 in all rooms."
            />
            <ServicesProps
            icon = {<TbToolsKitchen2 className="text-custom-yellow text-[40px] opacity-85"/>}
            title="kitchen"
            description="Our kitchen provides a wide range of daily fresh and tasty meals to our clients."
            />
            <ServicesProps
            icon = {<BsPlug className="text-custom-yellow text-[40px] opacity-85"/>}
            title="ironing"
            description="Use our ironing services to quickly made your clothes look splendid after laundry."
            />
            <ServicesProps
            icon = {<MdOutlineLockOpen className="text-custom-yellow text-[40px] opacity-85"/>}
            title="lockers"
            description="If you carry any valuable items, feel free to store them in our hostel’s lockers."
            />
        </motion.div>
    </div>
  )
}

export default Services