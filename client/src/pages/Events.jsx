import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { GET_ALL_EVENTS } from "../utils/constants";
import { toast } from "react-toastify";
import { apiClient } from "../lib/api-clinet";
import image from "../assets/EVENTIMAGE.avif";
import { format } from "date-fns";

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
            console.log(response.data);
        } catch (error) {
            toast.error(error.message);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div>
            <div className='h-[300px] flex items-center justify-center'>
                <div className='w-full p-5 flex flex-col items-center bg-white/20 backdrop-blur-sm justify-center'>
                    <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ ease: "easeInOut", duration: 0.3 }} className='sm:mr-20 z-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider'>Elite Event Planners</motion.span>
                </div>
            </div>

            <div className="bg-white flex flex-col">
                
                <div className="flex flex-wrap gap-5 w-full items-center px-3 sm:px-9 md:px-32 lg:px-80 justify-between py-5">
                    <div className="">
                        <select id="eventCategory" name="eventCategory" className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200">
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
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="search" type="text" className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" />
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
                    <div className="flex flex-wrap w-full gap-5 px-3 sm:px-9 md:px-32 lg:px-80 py-5">
                        {events?.map((event, index) => (
                            <motion.div key={index} variants={cardVariants} initial="hidden" animate="visible" className="bg-white basis-[400px] rounded-lg shadow-lg p-5 transform transition-all duration-300 hover:shadow-xl hover:scale-[101%]">
                                <img src={image} alt={"image"} className="h-50 w-50 object-contain mx-auto mb-4" />

                                <h1 className="text-xl font-semibold text-blue-600 mb-1">{event.title}</h1>
                                <h1 className="text-xs">{event.description}</h1>
                                <h2 className="text-xs font-bold text-black-300 mt-1">Category: {event.category}</h2>
                                <h2 className="text-xs text-gray-500 font-medium mt-1">Location: <span className="text-blue-700">{event.location?.state + " , " + event.location?.country}</span></h2>

                                <div className="flex my-4 items-center justify-between">
                                    <button className="flex items-center text-black px-4 py-2 rounded-lg shadow transition duration-200">
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
                                    <button className="flex items-center justify-center text-white px-5 py-2 bg-blue-500 rounded-lg transition duration-200 hover:bg-blue-600 mx-auto">Register</button>
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
