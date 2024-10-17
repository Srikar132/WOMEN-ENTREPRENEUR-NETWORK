import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { AiOutlineSearch } from 'react-icons/ai';
import { GET_ALL_BUSINESSES } from '../utils/constants';
import image from "../assets/woemnemp.jpeg"
import {toast} from "react-toastify"
import { apiClient } from '../lib/api-clinet';
import {Link} from "react-router-dom"
function Business() {
  const [searchTerm , setsearchTerm] = useState("");
  const [category, setCategory ] = useState("");
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState([]);

      const getBusiness = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`${GET_ALL_BUSINESSES}`,{withCredentials : true});
            setBusiness(response.data)
            setLoading(false);
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
            setBusiness([]);
        }

    }

    useEffect(() => {
      getBusiness();
    } , []);


   return (
    <div>
          <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex flex-col items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Business showcase</motion.span>
            </div>
        </div>


        <div className="bg-white flex flex-col">
            <div className="flex flex-wrap gap-5  w-full items-center px-3 sm:px-9 md:px-32 lg:px-80 justify-between py-5">
                <div className="">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="search"
                        className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    >
                        <option value="">Select a Category</option>
                        <option value="success-stories">Success Stories</option>
                        <option value="leadership-development">Leadership Development</option>
                        <option value="business-funding">Business Funding</option>
                        <option value="marketing-strategies">Marketing Strategies</option>
                        <option value="networking-tips">Networking Tips</option>
                        <option value="work-life-balance">Work-Life Balance</option>
                        <option value="mentorship">Mentorship</option>
                        <option value="personal-branding">Personal Branding</option>
                        <option value="startup-guides">Startup Guides</option>
                        <option value="social-impact">Social Impact</option>
                        <option value="tech-innovation">Tech Innovation</option>
                        <option value="financial-literacy">Financial Literacy</option>
                        <option value="scaling-business">Scaling Your Business</option>
                        <option value="ecommerce">E-commerce Strategies</option>
                        <option value="women-in-leadership">Women in Leadership</option>
                        <option value="self-care">Self-Care for Entrepreneurs</option>
                    </select>
                </div>

                <div className="flex items-center justify-center ">
                    <input value={searchTerm} onChange={(e) => {
                        setsearchTerm(e.target.value);
                    }} placeholder="search" type="text"  className="w-full flex-1 p-2 border border-gray-300   focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"/>
                    <div>
                        <button   className="border  text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white ">
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
              <div className="flex flex-wrap w-full gap-5 justify-center px-3 sm:px-9 md:px-32 lg:px-80  py-5">
                  {business.map((item , index) => (
                  <div
                    key={item.name}
                    className="bg-white shadow-sm  p-6 transition-transform transform hover:scale-[101%]"
                  >
                    <img
                      src={image}
                      alt={item.name}
                      className="h-50 w-50 object-contain mx-auto mb-4"
                    />
                    <Link className="text-2xl font-bold text-blue-800 mb-2">
                      {item.name}
                    </Link>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-sm font-semibold text-gray-500">
                      Category: {item.category}
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                      Location: {item.location.city}, {item.location.country}
                    </p>
                    <p className="mt-4">
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-orange-300; font-bold">
                        {item.ratings.average}★ ({item.ratings.total} reviews)
                      </p>
                      <a
                        href={`/business/${item._id}`}
                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                  ))}
              </div>
            )}
        </div>
    </div>

  )
}

export default Business