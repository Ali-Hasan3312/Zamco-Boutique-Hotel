import { motion } from "framer-motion"
import discountimage from "../assets/DiscountOffer.jpg"
import { FadeUp } from "../utils/animation"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
const SignUp = () => {
  const [email, setEmail] = useState('')
  
  const submitHandler = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/subscribe`, {
        email,
        
      });
      if (response.data) {
        toast.success(response.data.message);
        // Reset form after successful submission
        setEmail('')
       
      }
    } catch (error:any) {
     
      toast.error(error.response?.data?.message || "Could not subscribed. Please try again.");
    }

  }
  return (
    <div className="h-[400px] w-full relative mt-12">
        <img className="h-full w-full object-cover" src={discountimage} alt="" />
        <div className="h-full w-[40%] text-center absolute lg:top-[35%] left-[32%] sm:top-[10%] items-center flex flex-col gap-4 text-white">
        <motion.h1
         variants={FadeUp(0.3)}
         initial="hidden"
         whileInView={"visible"}
        className=" text-4xl font-semibold max-sm:text-xl">Sign Up for 25% Discount</motion.h1>
        <motion.span 
        variants={FadeUp(0.3)}
        initial="hidden"
        whileInView={"visible"}
        className=" text-lg max-sm:text-sm">Want to get an instant discount for your stay at our hostel? Leave your email and sign up for our newsletter with 25% off all our rooms.</motion.span>
       <div className="flex gap-2">
       <motion.input
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity:1, x:0}}
       transition={{duration: 1, delay: 0.3}}
       type="text"
       value={email} onChange={(e) => setEmail(e.target.value)}
       name="email"
       placeholder="Enter Your E-mail" className="h-16 w-72 max-sm:h-10 max-sm:w-48 max-sm:text-sm bg-black/50 outline-none placeholder:text-white px-4" />
       <motion.button
       initial={{opacity: 0, x: 100}}
       whileInView={{opacity:1, x:0}}
       transition={{duration: 1, delay: 0.3}}
       onClick={submitHandler}
       className="h-16 w-32 bg-custom-yellow text-gray-600 max-sm:h-10 max-sm:w-20 max-sm:text-[12px]">Subscribe</motion.button>
       </div>
        </div>
    </div>
  )
}

export default SignUp