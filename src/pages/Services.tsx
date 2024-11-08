import { motion } from "framer-motion";
import { forwardRef } from "react";
import { BsCupHot, BsPlug } from "react-icons/bs";
import { FaShower } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import ServicesProps from "../components/ServicesProps";
import { FadeUp } from "../utils/animation";

interface servicesProps extends React.HTMLAttributes<HTMLDivElement> {}
const Services = forwardRef<HTMLDivElement, servicesProps>((_, ref) => {
  
  return (
    <div ref={ref} id="services" className="mt-24">
        <h1 className="text-5xl lg:text-2xl tracking-wide font-semibold uppercase text-center">What we offer</h1>
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-48 mx-8 lg:px-0 lg:gap-0 mt-32 lg:mt-10"
        variants={FadeUp(0.3)}
        initial="hidden"
        whileInView={"visible"}
        >
            <ServicesProps
            icon = {<BsCupHot className="text-custom-yellow text-[80px] lg:text-[40px] opacity-85"/>}
            title="Tea & coffee"
            description="You can always have some hot coffee & tea in our kitchen, available to all our clients"
            />
            <ServicesProps
            icon = {<FaShower className="text-custom-yellow text-[80px] lg:text-[40px] opacity-85"/>}
            title="hot showers"
            description="Zamco Boutique Hotel is famous for clean and hot showers that you can have at any time of the day."
            />
          
            <ServicesProps
            icon = {<TbAirConditioning className="text-custom-yellow text-[80px] lg:text-[40px] opacity-85"/>}
            title="Air conditioning"
            description="All rooms at our hotel are equiped with reliable air conditioner systems."
            />
            <ServicesProps
            icon = {<FaWifi className="text-custom-yellow text-[80px] lg:text-[40px] opacity-85"/>}
            title="free wi-fi"
            description="Our hotel is equipped with free high-speed Wi-Fi that is available 24/7 in all rooms."
            />
          
            <ServicesProps
            icon = {<BsPlug className="text-custom-yellow text-[80px] lg:text-[40px] opacity-85"/>}
            title="ironing"
            description="Use our ironing services to quickly made your clothes look splendid after laundry."
            />
           
        </motion.div>
    </div>
  )
})

export default Services