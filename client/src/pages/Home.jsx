import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import image from '../assets/woemnemp.jpeg'
import home1 from "../assets/homepage.png"
import home2 from "../assets/WOMEN-3.jpg"
import { Link } from 'react-router-dom';
import VideoCourousal from '../components/VideoCourousal';
const features = [
  {
    title: "Empowering Job Board",
    quotation: "Fueling Dreams, One Opportunity at a Time",
    description: "Our platform’s Job Board is a powerful tool for women entrepreneurs to post job opportunities, creating a bridge between visionary leaders and skilled professionals. Whether you’re seeking talent to scale your business or looking for your next great career move, this space is designed to empower growth, inclusivity, and collaboration.",
    image: "https://img.freepik.com/free-vector/co-workers-concept-landing-page_52683-27131.jpg?t=st=1729217521~exp=1729221121~hmac=e5e12b9c87b1934cdcebc22957f81b275c683a61bbe327b6b5049e1699bec3fa&w=740",
  },
  {
    title: "Insightful Articles",
    quotation: "Knowledge is Power – Your Gateway to Wisdom",
    description: "Stay inspired and informed with carefully curated articles on the latest trends, success stories, and strategies from top women entrepreneurs. This section provides resources and practical insights to help entrepreneurs and professionals alike sharpen their skills, embrace innovation, and navigate the challenges of business ownership with confidence.",
    image: "https://img.freepik.com/free-vector/flat-hand-drawn-businesswoman-multitasking-illustration_23-2148868811.jpg?t=st=1729217773~exp=1729221373~hmac=ac9c2a07cf37ee3ff1e580a2d53736621e7a26b560f4961ba0e498ce8155a3b4&w=996",
  },
  {
    title: "Dynamic Community",
    quotation: "Together We Rise",
    description: "Our community hub is the heartbeat of this network—a vibrant space where entrepreneurs, visitors, and even admin can connect, share insights, and exchange ideas. It’s more than just a forum; it’s a collective voice of like-minded individuals lifting each other up, sparking conversations that lead to innovation, collaboration, and a sense of belonging.",
    image: "https://img.freepik.com/free-vector/colleagues-working-together-illustrated_52683-27494.jpg?t=st=1729217673~exp=1729221273~hmac=906c8cef8481161e69101a605339cf21bfca3f36e7d9f9e723fdfaa4d34ea847&w=996",
  },
  {
    title: "Engaging Events",
    quotation: "Building Networks That Last Beyond the Room",
    description: "We organize a range of inspiring events, from virtual meetups to large-scale conferences, giving visitors the chance to register, participate, and engage in meaningful dialogue. These events are designed to cultivate relationships, expand business networks, and provide a platform for showcasing entrepreneurial stories that will motivate and encourage the next generation of women leaders.",
    image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-connecting-people-infographic_23-2149173990.jpg?t=st=1729217912~exp=1729221512~hmac=28c1bc7c09c5177c8e73e040335e8d433d40f2cac74ea56070b59dfc599e343c&w=740",
  },
];

function Home({ userInfo }) { 
  return (
      
      <div className="flex flex-col min-h-screen">

        <div className="container flex flex-col items-center gap-5 mx-auto">
            <div className='flex items-center justify-center gap-10 py-10 wifull '>
                <div className='text-2xl italic font-thin uppercase font'>Welcome to <br /> <span className="text-4xl font-semibold text-blue-500 md:text-6xl">women </span> <br />  <span className="text-4xl font-semibold text-blue-500 md:text-6xl">entrepreneurs</span> <br />   <span className="text-4xl font-semibold text-blue-500 md:text-6xl">network </span></div>
            </div>
            <div className="flex flex-wrap items-center justify-center p-5 md:flex-row-reverse">
              <div className="overflow-hidden border rounded-full h-44 w-44">
                  <img src={home1} className="object-cover" alt="" />
              </div> 
              <p className=' font-thin basis-[400px]'>Join a vibrant community dedicated to empowering women to achieve their entrepreneurial dreams. At the Women Entrepreneurs Network, we foster collaboration and support, creating an inspiring environment for personal and professional growth.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center p-5">
              <div className="overflow-hidden border rounded-full h-44 w-44">
                  <img src={home2} className="object-cover" alt="" />
              </div> 
              <p className=' font-thin basis-[400px]'>Network with like-minded women from diverse industries and backgrounds, sharing ideas and experiences. Together, we cultivate a space where innovation thrives, and every voice is heard—join us and elevate your entrepreneurial journey today!</p>
            </div>
        </div>

        <section id="highlights" className='w-screen h-full overflow-hidden bg-zinc common-padding '>
          <div className='screen-max-width '>
            <div className='justify-between w-full mb-12 md:flex items-ends'>
              <h1 id="title" className='text-3xl text-black uppercase '>GET highlights OF THIS WEBSITE</h1>
            </div>
            <VideoCourousal/>
          </div>
        </section>
       
        <motion.div 
          initial={{ opacity: 0, x: 100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          exit={{ opacity: 0, x: 100 }}
          className="flex flex-col items-center justify-center p-8 mx-auto mt-20 transition-transform duration-300 rounded-lg  max-w-7xl"
        >
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
            Would you like to join us?
          </h2>
          <p className="mb-4 text-center text-gray-600">
            Join us to be a part of something special. We value community and collaboration!
          </p>
          <motion.button
            className="px-6 py-3 font-normal tracking-wider text-white uppercase transition duration-300 bg-blue-600 rounded-md hover:bg-blue-400"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link to={"/auth/register"}>join us</Link>
          </motion.button>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-16 p-5 mt-10">
          <AnimatePresence>
            {features.map((feature, index) => (
              <div key={feature.title} className='flex flex-col flex-wrap items-center justify-center w-full gap-10 mx-auto odd:flex-row-reverse lg:flex-row md-gap-44 lg:w-3/4'>
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
                  className="w-full max-w-xs p-5 transition-shadow duration-300 border border-gray-300 rounded-lg shadow-md bg-blue-50 hover:shadow-lg"
                >
                  <h3 className="text-xl font-normal text-center text-blue-600">{feature.title}</h3>
                  <p className='mt-2 text-gray-700 font-italic text-md'>"{feature.quotation}"</p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* "How We're Different" Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          className="grid grid-cols-3 gap-5 p-10 mt-20 text-white bg-blue-500 rounded-lg shadow-lg opac place-items-center "
        >
          <div className="flex flex-col col-span-2 ">
            <h2 className="text-3xl font-bold">How We're Different</h2>
            <p className="mt-4 text-lg text-BLACK">
            At FEMPOWER, we go beyond just offering a platform for women entrepreneurs to connect.
            We’re creating a space that’s truly empowering and inclusive, designed specifically 
            to meet the unique needs of women in business. Here's how we stand out
            <p> 1. Tailored resources and mentorship specifically for women entrepreneurs. </p> 
            <p>2. Focus on collaboration over competition, fostering community growth.</p>  
            <p>3. Exclusive content addressing challenges women face in business.</p> 
            <p>4. Tools for showcasing businesses and building meaningful connections.</p>  
            <p>5. Safe, respectful, and inclusive space for personal and professional growth.</p>  
            <p>6. Local and global networking opportunities.</p>  
            <p>7. Emphasis on community-driven support and guidance.</p>  
            <p>8. Empowering women to thrive and succeed together.</p>
            </p>

          </div>
          <motion.div
                initial={{opacity : 0 , y : 50}}
                animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
            className="bg-white col-span-1 flex flex-col   gap-5 border text-black border-gray-200 shadow-lg p-6 w-[400px]">
                <div className="flex items-center justify-center overflow-hidden">
                    <img
                        src={image}
                        className="object-cover w-full h-full bg-center bg-cover" 
                        alt="women empowerment"
                        />
                </div>
                <h1 className="text-2xl">Get the happiness you deserve</h1>
                <p>No matter the challenge, you don't have to face it alone - but it’s up to you to take the first step.</p>
                <Link to={"/auth/register"} className="flex items-center justify-center w-full py-2 text-xl tracking-wider text-white transition duration-200 bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400">
                    Join us
                </Link>
            </motion.div>
        </motion.div>


      </div>

  );
}

export default Home;