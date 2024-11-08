import image3 from "../assets/Slider Images/3rdHero Image.png";
import image1 from "../assets/Slider Images/1stHero Image.png";
import slideImg2 from "../assets/Slider Images/2nd resized image.png";
interface heroCountProps {
  stateValue: number
}
const Background = ({stateValue}:heroCountProps) => {
  
    if(stateValue===0){
      return <img loading="lazy" className=" relative inset-x-0 top-[0px] w-full h-[50vh] lg:h-[80vh] object-cover z-[-1] p-0"  src={image1} />
    }else if(stateValue===1){
      return <img loading="lazy" className=" relative inset-x-0 top-[0px] w-full h-[50vh] lg:h-[80vh] object-cover z-[-1] p-0"  src={slideImg2} />
    }else if(stateValue===2){
      return <img loading="lazy"  className=" relative inset-x-0 top-[0px] w-full h-[50vh] lg:h-[80vh] object-cover z-[-1] p-0" src={image3} />
    }
  
}

export default Background