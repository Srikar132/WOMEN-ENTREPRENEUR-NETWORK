
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { GET_ALL_EVENTS } from "../utils/constants";
import { toast } from "react-toastify";
import { apiClient } from "../lib/api-clinet";
import image from "../assets/WEMBG.jpg";
import { format } from "date-fns";
import axios from "axios";

function Events() {

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    const getEvents = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`${GET_ALL_EVENTS}`, { withCredentials: true });
            setEvents(response.data.events);
        } catch (error) {
            toast.error(error.message);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const searchEvents = async () => {
        try {

            setLoading(true);
            let queryString = '/api/event/search?';
        
              if (searchTerm) {
                queryString += `title=${searchTerm}&`;
              }
        
            if (category) {
               queryString += `category=${category}&`;
            }
            const uri=`http://localhost:8000${queryString}`
            console.log(uri);
            
            console.log(queryString); 
            const response = await axios.get(uri,{withCredentials : true});
            setEvents(response.data.events)
            setLoading(false);
            console.log( "searched : " ,response.data)
        } catch (error) {
            toast.error("Error")
            setLoading(false);
            setEvents([]);
        }
      };
    
    
    
    useEffect(() => {
        getEvents();
    }, []);


    useEffect(() => {
        searchEvents();
      }, [searchTerm, category]);
    
    

    return (
        <div>
            <div className='h-[300px] flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
                    <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }} className='z-0 text-xl font-bold tracking-wider sm:mr-20 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Events Organisation</motion.span>
                </div>
            </div>

            <div className="flex flex-col bg-white">
                
                <div className="flex flex-wrap items-center justify-between w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
                    <div className="">
                        <select id="eventCategory" 
                          name="eventCategory"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                         className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400">
                            <option value="">Select a Category</option>
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

                    <div className="flex items-center justify-center">
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="search" type="text" className="flex-1 w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400" />
                        <div>
                            <button className="border text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white">
                                <AiOutlineSearch />
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-[100px]">
                        <div className="w-[50px] h-[50px] rounded-full border border-gray-400 border-t-black animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-wrap w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
                        { typeof events === "object" &&  events.map((event) => (
                       <motion.div key={event.id} variants={cardVariants} initial="hidden" animate="visible"
                       className="bg-white basis-[400px] rounded-lg shadow-lg p-5 transform transition-all duration-300 hover:shadow-xl hover:scale-[101%]">
                       <img src={image} alt={"image"} className="object-contain mx-auto mb-4 h-50 w-50" />
                       <h1 className="mb-1 text-xl font-semibold text-blue-600">{event.title}</h1>
                        <h1 className="text-xs">{event.description}</h1>
                        <h2 className="mt-1 text-xs font-bold text-black-300">Category: {event.category}</h2>
                        <h2 className="mt-1 text-xs font-medium text-gray-500">Location: <span className="text-blue-700">{event.location?.state + " , " + event.location?.country}</span></h2>
                        <div className="flex items-center justify-between my-4">
            <button className="flex items-center px-4 py-2 text-black transition duration-200 rounded-lg shadow">
                <FaCalendarAlt className="mr-2" />
                {(() => {
                    try {
                        const parsedDate = new Date(event.date);
                        if (isNaN(parsedDate)) throw new Error("Invalid Date");
                        return format(parsedDate, 'MMMM dd, yyyy');
                    } catch (e) {
                        console.error('Invalid date value:', event.date, e);
                        return 'Date not available';
                    }
                })()}
            </button>
            <button className="flex items-center justify-center px-5 py-2 mx-auto text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600">Register</button>
        </div>
    </motion.div>
))}

                    </div>
                )}
            </div>
        </div>
    );
}

export default Events;