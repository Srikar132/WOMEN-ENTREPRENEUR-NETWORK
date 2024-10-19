import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image from '../assets/woemnemp.jpeg'
import home1 from "../assets/HEROIMAGE.png"
import home2 from "../assets/HEROIMAGE2.png"
import home3 from "../assets/HEROIMAGE3.png"
import { Link } from 'react-router-dom';
import homeDesign from '../assets/HomeDesign.png'
import VideoCourousal from '../components/VideoCourousal';
const features = [
  {
    title: "Empowering Job Board",
    quotation: "Fueling Dreams, One Opportunity at a Time",
    description: "Our Job Board connects women entrepreneurs with skilled professionals, offering opportunities to grow businesses or advance careers. It's a space for collaboration and inclusivity.",
    image: "https://img.freepik.com/free-vector/co-workers-concept-landing-page_52683-27131.jpg?t=st=1729217521~exp=1729221121~hmac=e5e12b9c87b1934cdcebc22957f81b275c683a61bbe327b6b5049e1699bec3fa&w=740",
  },
  {
    title: "Insightful Articles",
    quotation: "Knowledge is Power – Your Gateway to Wisdom",
    description: "Explore curated articles on trends, success stories, and strategies from top women entrepreneurs. These resources help sharpen skills and embrace innovation.",
    image: "https://img.freepik.com/free-vector/flat-hand-drawn-businesswoman-multitasking-illustration_23-2148868811.jpg?t=st=1729217773~exp=1729221373~hmac=ac9c2a07cf37ee3ff1e580a2d53736621e7a26b560f4961ba0e498ce8155a3b4&w=996",
  },
  {
    title: "Dynamic Community",
    quotation: "Together We Rise",
    description: "Our community hub fosters connections between entrepreneurs, visitors, and admin. It's a vibrant space for exchanging ideas, sparking collaboration, and building a sense of belonging.",
    image: "https://img.freepik.com/free-vector/colleagues-working-together-illustrated_52683-27494.jpg?t=st=1729217673~exp=1729221273~hmac=906c8cef8481161e69101a605339cf21bfca3f36e7d9f9e723fdfaa4d34ea847&w=996",
  },
  {
    title: "Engaging Events",
    quotation: "Building Networks That Last Beyond the Room",
    description: "We host events, from virtual meetups to conferences, offering opportunities for networking and showcasing stories that inspire the next generation of women leaders.",
    image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-connecting-people-infographic_23-2149173990.jpg?t=st=1729217912~exp=1729221512~hmac=28c1bc7c09c5177c8e73e040335e8d433d40f2cac74ea56070b59dfc599e343c&w=740",
  },
];

function Home({ userInfo }) { 
  return (
      
      <div className="flex flex-col min-h-screen z-0 pointer-events-none">

        <div className="w-full h-screen mt-20
         flex flex-wrap gap-3 relative">
          <div  className='flex-1 flex items-center justify-center'>
            <motion.div initial={{opacity : 0 , x : -10 , y : -10}} animate={{opacity : 1 , x : 0 , y  : 0 }} transition={{duration : 0.2 , ease : "easeInOut"}} className='flex flex-col'>
              <span className='text-7xl uppercase font-bold tracking-wider'>WOMEN</span>
              <span className='text-7xl uppercase text-blue-400 font-bold tracking-wider'>entrepreneur</span>
              <span className='text-7xl uppercase  font-bold tracking-wider'>network</span>
              <div className='flex flex-col my-10 gap-5  px-3 py-2'>
                <motion.div initial={{opacity : 0  , y : 20}} animate={{opacity : 1 ,  y  : 0 }} transition={{duration : 0.5 , ease : "easeInOut"}}>
                  <div className='text-black font-bold text-3xl'>Find your role here </div>
                </motion.div>
                <motion.div  className='flex gap-5' initial={{opacity : 0  , y : 20}} animate={{opacity : 1 ,  y  : 0 }} transition={{duration : 1 , ease : "easeInOut"}}>
                  <button className='rounded-xl shadow-md font-bold capitalize tracking-wider px-3 py-2  bg-blue-500 text-white hover:bg-blue-400 '>i'm entrepreneur</button>
                  <button className='rounded-xl shadow-md font-bold capitalize tracking-wider px-3 py-2 text-blue-500 bg-white hover:bg-gray-100  '>i'm visitor</button>
                </motion.div>
              </div> 
            </motion.div>
          </div>
          <div className='flex-1 place-self-center 
          '>
              <img src={home1} alt="" />
          </div>
          <div className="absolute bottom-[54px] left-0">
              <img src={home2} alt="" />
          </div>
          <div className="absolute top-[230px] left-0">
              <img src={homeDesign} alt="" />
          </div>
          <div className="absolute top-[100px] ml-[800px] left-0">
              <img src={homeDesign} alt="" />
          </div>
        </div>

        <div className='w-full h-screen flex flex-wrap gap-3  relative'>
          <div className="flex items-center justify-center  flex-1">
            <div className='flex flex-col flex-wrap gap-5 '>
              <div className='text-3xl uppercase text-blue-500 tracking-wider'>WHAT IS WEN ?</div>
              <p className='text-xs w-[300px]'>Women Entrepreneur Networking connects women business owners, fostering collaboration, mentorship, and mutual support. It helps women overcome challenges, share resources, and access growth opportunities. Through networking, entrepreneurs build partnerships, exchange valuable business insights, and gain access to mentorship from experienced leaders. Networking events, workshops, and online communities provide platforms for learning and inspiration. It empowers women to thrive in male-dominated industries by offering emotional and professional support. This collaborative environment helps women scale their businesses, navigate challenges, and succeed together. Ultimately, it creates a supportive space for women entrepreneurs to grow and excel.</p>
            </div>
          </div>
          <div className='flex-1 place-self-center h-80 w-72'>
              <img src={home3} alt="" />
          </div>
          <div className="absolute bottom-[54px] left-0">
              <img src={home2} alt="" />
          </div>
        </div>

        <section id="highlights" className='w-screen pointer-events-auto h-full bg-zinc overflow-hidden common-padding '>
          <div className='screen-max-width '>
            <div className='mb-12 md:flex items-ends justify-between w-full'>
              <h1 id="title" className='text-black uppercase text-3xl '></h1>
            </div>
            <VideoCourousal/>
          </div>
        </section>
       
       {/* featires */}
       <div className="container flex-center bg-gray-200 gap-5 flex-wrap p-10">
          <div className='w-full text-center text-3xl uppercase font-bold'>KEY FEATURES</div>
          {features.map((card , index) => (
            <div key={index} className="bg-white pointer-events-auto cursor-pointer basis-[300px] p-5 shadow-md hover:scale-105 transition-all duration-300">
              <div className='font-bold'>{card?.title}</div>
              <p className='text-xs'>{card?.description}</p>
            </div>
          ))}
       </div>


        {/* <div className="mt-10 p-5 flex flex-col items-center justify-center gap-16">
          <AnimatePresence>
            {features.map((feature, index) => (
              <div key={feature.title} className='flex flex-col odd:flex-row-reverse flex-wrap lg:flex-row items-center justify-center gap-10 md-gap-44 w-full lg:w-3/4 mx-auto'>
                <motion.img 
                  initial={{ opacity: 0, x: index %  2== 0 ? 200 : -200 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.7 , ease:"easeInOut"}} 
                  exit={{ opacity: 0, x: index % 2==0 ? 200 : -200 }}
                  src={feature.image} 
                  alt={feature.title} 
                  className="object-contain rounded-xl h-auto w-[350px] shadow-sm border-1" 
                /> 
                <motion.div 
                  initial={{ opacity: 0,  x: index % 2==0 ? -200 : 200  }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.7,ease:"easeInOut" }} 
                  exit={{ opacity: 0, x: index % 2==0 ? -200 : 200  }}
                  className="border border-gray-300 bg-blue-50 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 max-w-xs w-full"
                >
                  <h3 className="text-xl font-normal text-center text-blue-600">{feature.title}</h3>
                  <p className='mt-2 text-gray-700 font-italic text-md'>"{feature.quotation}"</p>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div> */}

        {/* "How We're Different" Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          className="bg-blue-500  place-items-center grid grid-cols-3 gap-5 text-white p-10 rounded-lg shadow-lg mt-20   "
        >
          <div className=" flex flex-col col-span-2">
            <h2 className="text-3xl font-bold">How We're Different</h2>
            <p className="text-BLACK text-lg mt-4">
            At FEMPOWER, we go beyond just offering a platform for women entrepreneurs to connect.
            We’re creating a space that’s truly empowering and inclusive, designed specifically 
            to meet the unique needs of women in business. Here's how we stand out            </p>
            <p> 1. Tailored resources and mentorship specifically for women entrepreneurs. </p> 
            <p>2. Focus on collaboration over competition, fostering community growth.</p>  
            <p>3. Exclusive content addressing challenges women face in business.</p> 
            <p>4. Tools for showcasing businesses and building meaningful connections.</p>  
            <p>5. Safe, respectful, and inclusive space for personal and professional growth.</p>  
            <p>6. Local and global networking opportunities.</p>  
            <p>7. Emphasis on community-driven support and guidance.</p>  
            <p>8. Empowering women to thrive and succeed together.</p>


          </div>
          <motion.div
                initial={{opacity : 0 , y : 50}}
                animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
            className="bg-white col-span-1 flex flex-col   gap-5 border text-black border-gray-200 shadow-lg p-6 w-[400px]">
                <div className="overflow-hidden  flex items-center justify-center">
                    <img
                        src={image}
                        className="object-cover w-full h-full  bg-cover bg-center" 
                        alt="women empowerment"
                        />
                </div>
                <h1 className="text-2xl">Get the happiness you deserve</h1>
                <p>No matter the challenge, you don't have to face it alone - but it’s up to you to take the first step.</p>
                <Link to={"/auth/register"} className="w-full pointer-events-auto flex items-center justify-center tracking-wider text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200  text-white py-2 bg-blue-600">
                    Join us
                </Link>
            </motion.div>
        </motion.div>


      </div>

  );
}

export default Home;