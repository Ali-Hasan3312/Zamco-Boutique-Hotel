import image3 from "../assets/Gallery/pexels-chanwalrus-941861.jpg";
import image1 from "../assets/Gallery/pexels-pixabay-260922.jpg";
import slideImg2 from "../assets/Slider Images/pexels-elina-sazonova-1838554.jpg";
interface heroCountProps {
  stateValue: number
}
const Background = ({stateValue}:heroCountProps) => {
    // const [isVideoLoaded, setIsVideoLoaded] = useState(false);

   
    // const handleCanPlay = () => {
    //   setIsVideoLoaded(true);
    // };
    if(stateValue===0){
      return <img className=" relative inset-x-0 top-[0px] w-full h-[500px] object-cover z-[-1] p-0"  src={image1} />
    }else if(stateValue===1){
      return <img className=" relative inset-x-0 top-[0px] w-full h-[500px] object-cover z-[-1] p-0"  src={slideImg2} />
    }else if(stateValue===2){
      return <img  className=" relative inset-x-0 top-[0px] w-full h-[500px] object-cover z-[-1] p-0" src={image3} />
    }
  
    return (
    <div>
    {/* {!isVideoLoaded && (
        <Loader />
      )}
    <video
        onCanPlay={handleCanPlay} autoPlay={true} muted={true} loop={true} className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0"  src={zamcoVideo} />
    */}
    {/* <img className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0" src={slideImg1} alt="" /> */}
    </div>
  
    )
}

export default Background