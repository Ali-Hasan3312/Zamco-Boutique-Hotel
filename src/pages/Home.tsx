import Cards from '../components/Cards'
import Gallery from '../components/Gallery'
import Navbar from '../components/navbar'
import Services from './Services'
import ImgSlider from '../components/Slider'
import OurRooms from './OurRooms'


const Home = () => {
  return (
    <div>
        <Navbar />
        <ImgSlider />
        <Cards />
        <Gallery />
        <Services />
        <OurRooms />
    </div>
  )
}

export default Home