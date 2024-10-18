import {motion} from "framer-motion"
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { GET_ALL_EVENTS } from "../utils/constants";
import {toast} from "react-toastify"
import { apiClient } from "../lib/api-clinet";

function Events() {

    const [searchTerm , setsearchTerm] = useState("");
    const [category, setCategory ] = useState("");
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([""]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const getEvents = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`${GET_ALL_EVENTS}`,{withCredentials : true});
            setEvents(response.data.events)
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
            setEvents([]);
        }
        finally{
            setLoading(false);
        }

    }

    const searchEvents = async () => {
        try {
          setLoading(true);
    
          
          let queryString = '/api/events/search?';
    
          if (searchTerm) {
            queryString += `name=${searchTerm}&`;
          }
    
          if (category) {
            queryString += `category=${category}&`;
          }
    
          console.log(queryString); 
    
       
          const response = await apiClient.get(queryString, { withCredentials: true });
          setEvents(response.data);
          console.log(">>>>>>>",events)
          setLoading(false);
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      };
    
     
    
    useEffect(() => {
        getEvents();
    } ,[])

    useEffect(() => {
        searchEvents();
      }, [searchTerm, category]);
    
  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='z-0 text-xl font-bold tracking-wider sm:mr-20 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl' >Events Organisation</motion.span>
            </div>
        </div>

        <div className="flex flex-col bg-white">
            <div className="flex flex-wrap items-center justify-between w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
                <div className="">
                    <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="eventCategory" 
                    name="eventCategory" 
                    className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"
                    >
                        <option value="networking">Networking</option>
                        <option value="workshop">Workshop</option>
                        <option value="panel_discussion">Panel Discussion</option>
                        <option value="mentorship">Mentorship Program</option>
                        <option value="conference">Conference</option>
                        <option value="pitch_event">Pitch Event</option>
                        <option value="seminar">Seminar</option>
                        <option value="webinar">Webinar</option>
                        <option value="retreat">Retreat</option>
                        <option value="social_event">Social Event</option>
                    </select>
                </div>

                <div className="flex items-center justify-center ">
                    <input 
                    value={searchTerm}
                    onChange={(e) => {
                     setsearchTerm(e.target.value);
                    }} placeholder="search" type="text"  className="flex-1 w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"/>
                    <div>
                        <button  className="border  text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white ">
                            <AiOutlineSearch  />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-[100px]">
                  <div className="w-[50px] h-[50px] rounded-full border border-gray-400 border-t-black animate-spin"/>
              </div>
            ) : (
              <div className="flex flex-wrap w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
                  {events.map((event , index) => (
                    <motion.div 
                        key={index} 
                        className="bg-white basis-[400px] rounded-lg shadow-lg p-5 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        transition={{ duration: 0.5, delay: index * 0.1 }} 
                    >
                        <img
                        src={""}
                        alt={"image"}
                        className="object-contain mx-auto mb-4 h-50 w-50"
                        />
                        <h2 className="mb-3 text-2xl text-blue-500">{event?.title}</h2>
                        <p className="mb-4 text-gray-700">{event?.description}</p>
                        <div className="flex mb-4">
                            <button className="flex items-center px-4 py-2 text-black transition duration-200 rounded-lg shadow hover:bg-blue-700">
                                <FaCalendarAlt className="mr-2" />
                                {"12/45"}
                            </button>
                        </div>
                        <p className="text-gray-500">Location: {event?.location}</p>
                        { (
                            <a 
                                href={event?.virtualLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 mt-4 text-white bg-blue-500 rounded-sm shadow hover:bg-blue-700"
                            >
                                Register
                            </a>
                        )}
                    </motion.div>

                  ))}
              </div>
            )}

        </div>


    </div>
  )
}

export default Events