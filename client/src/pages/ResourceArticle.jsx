import {motion} from "framer-motion"
import { AiOutlineSearch } from "react-icons/ai"
import image from "../assets/woemnemp.jpeg"
import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
import {apiClient} from "../lib/api-clinet"
import { GET_ALL_RESOURCES } from "../utils/constants"
import {toast} from "react-toastify"
function ResourceArticle() {
    const [searchTerm, setsearchTerm] = useState("")
    const [category , setCategory] = useState("")
  const [resources , setResources] = useState([]);
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    getResources();
  } , []);

  const searchResources = async () => {
    try {
        setLoading(true);
        const response = await apiClient.get(`${GET_ALL_RESOURCES}search?category?=${category}&tags=${searchTerm}&title=${searchTerm}`,{withCredentials : true});
        setResources(response.data)
        setLoading(false);
        console.log( "searched : " , response.data)
    } catch (error) {
        toast.error("Error")
        setLoading(false);
        setResources([]);
    }
}

  useEffect(() => {
    console.log(searchTerm , category)
    if(!searchTerm=="" && !category === "Select a Category"){
        searchResources.call();
    }
  } , [searchTerm , category])


  const getResources = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`${GET_ALL_RESOURCES}`,{withCredentials : true});
            setResources(response.data)
            setLoading(false);
        } catch (error) {
            toast.error("Error")
            setLoading(false);
            setResources([]);
        }

    }
  


  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex flex-col items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Resources :</motion.span>
            </div>
        </div>

        <div className="bg-white flex flex-col ">
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
                        <button  onClick={() => searchResources()} className="border  text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white ">
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
                    {resources?.map((article , index) => (
                        <div className="card basis-[300px] p-3 flex flex-col gap-3 shadow-md hover:scale-[101%] transition-all duration-500">
                            <div className="w-full h-full max-w-full max-h-full overflow-hidden">
                                <img 
                                    src={image} 
                                    alt="article" 
                                    className="object-cover w-full h-full" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link to={`/resource/articles/${article._id}`} className="hover:underline text-blue-400 hover:text-blue-500 ">{article.title + " by " + article.author.name}</Link>
                                <span className="text-sm uppercase text-gray-800 text-opacity-60">falls under the category of {article.category}</span>
                                <span className="text-xs text-gray-400 text-opacity-65 text-right">version  : {article.version}</span>
                                <span className="text-xs text-gray-400 text-opacity-65 text-right">last updated  : {"10/12"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default ResourceArticle