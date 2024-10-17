import { set } from "date-fns";
import {motion} from "framer-motion" 
import { useState } from "react";
import { countriesWithStates } from "../lib/utils";
import image from "../assets/BUSINESSIMAGE.webp"
import { apiClient } from "../lib/api-clinet";
import { AiOutlineDelete } from "react-icons/ai";
import { POST_A_BUSINESS } from "../utils/constants";
import { toast } from "react-toastify";

function HostEvent() {
  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Share knowledge</motion.span>
            </div>
        </div>

        <div className="bg-white flex-flex-col">
            
        </div>

    </div>
  )
}

export default HostEvent