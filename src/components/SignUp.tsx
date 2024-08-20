import { Link } from "react-router-dom"
import discountimage from "../assets/DiscountOffer.jpg"
const SignUp = () => {
  return (
    <div className="h-[400px] w-full relative mt-12">
        <img className="h-full w-full object-cover" src={discountimage} alt="" />
        <div className="h-full w-[40%] text-center absolute top-[35%] left-[32%] items-center flex flex-col gap-4 text-white">
        <h1 className=" text-4xl font-semibold">Sign Up for 25% Discount</h1>
        <span className=" text-lg">Want to get an instant discount for your stay at our hostel? Leave your email and sign up for our newsletter with 25% off all our rooms.</span>
       <div className="flex gap-2">
       <input type="text" placeholder="Enter Your E-mail" className="h-16 w-72 bg-white/50 outline-none placeholder:text-white px-4" />
       <button className="h-16 w-32 bg-custom-yellow text-gray-600">Subscribe</button>
       </div>
        </div>
    </div>
  )
}

export default SignUp