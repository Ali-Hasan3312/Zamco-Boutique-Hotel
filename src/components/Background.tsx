import zamcoVideo from "../assets/hotel video/Zamco.mp4"

const Background = () => {
   
  
    return <video autoPlay={true} muted={true} loop={true} className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0"  src={zamcoVideo} />
  
 
}

export default Background