import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const ImgSlider = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: true, 
        pauseOnHover: true,
        dotsClass: "slick-dots custom-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const data = [
       
        {
            img: "https://images.unsplash.com/photo-1523699289804-55347c09047d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
            heading: "Welcom to Zamco Boutique hotel",
            p: `A special place where you can stay and relax`,
            link: "#"
        },
        {
            img: "https://plus.unsplash.com/premium_photo-1676321688630-9558e7d2be10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fHww",
            heading: "serving travellers on a budget",
            p: `we provide comfortable accomodation for you`,
            link: "#"
        },
        {
            img: "https://plus.unsplash.com/premium_photo-1676321688607-2d18ba129dbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
            heading: "A perfect and affordable place to stay",
            p: `Take advantage of the budget oriented accomodation`,
            link: "#"
        },
      
       
    ];
  return (
    <div className='w-full'>
            <div className='w-full'>
                <Slider {...settings}>
                    {data.map((d, index) => (
                        <div key={index} className='p-1'>
                            <div className=' h-[280px] w-full mx-1 rounded-xl flex flex-col items-center text-center relative'>
                                <div className='bg-gray-100 w-full flex justify-center pt-8 rounded-lg'>
                                    <img src={d.img} className=' object-cover' alt="" />
                                </div>
                                <h2 className='w-[240px] mt-8 text-xl font-bold'>{d.heading}</h2>
                                <p className='w-[240px] mt-7 text-gray-500'>{d.p}</p>
                                <button className='py-2 px-4 bg-customGreen mt-6 rounded-lg text-white'>Apply Now</button>
                                <a href={d.link} className='h-full w-full absolute'></a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
  )
}

export default ImgSlider