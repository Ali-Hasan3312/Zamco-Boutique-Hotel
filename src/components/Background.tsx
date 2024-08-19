import image1 from "../assets/Gallery/pexels-pixabay-260922.jpg"
import image2 from "../assets/Gallery/pexels-donaldtong94-189333.jpg"
import image3 from "../assets/Gallery/pexels-chanwalrus-941861.jpg"
interface heroCountProps {
  stateValue: number
}
const Background = ({stateValue}:heroCountProps) => {
   
  if(stateValue===0){
    return <img className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0"  src={image1} />
  }else if(stateValue===1){
    return <img className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0"  src={image2} />
  }else if(stateValue===2){
    return <img  className="inset-x-0 top-[190px] w-full h-[500px] object-cover z-[-1] p-0" src={image3} />
  }
 
}

export default Background