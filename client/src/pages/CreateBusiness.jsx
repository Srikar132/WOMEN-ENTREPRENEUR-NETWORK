import { set } from "date-fns";
import {motion} from "framer-motion" 
import { useState } from "react";
function CreateBusiness() {

  const [selectedTags , setSelectedTags] = useState([]);
  const tags = [
    'retail', 'restaurant', 'tech', 'consulting', 'manufacturing', 'healthcare',
    'finance', 'education', 'real-estate', 'entertainment', 'automotive', 'hospitality',
    'ecommerce', 'clothing', 'food', 'software', 'startup', 'advisory', 'B2B',
    'logistics', 'medical', 'investment', 'training', 'property', 'media',
    'vehicles', 'hotel', 'travel', 'luxury', 'online-learning', 'services',
    'supply-chain', 'production', 'sales', 'development', 'AI', 'blockchain', 
    'SaaS', 'financial', 'insurance', 'mortgage', 'tourism', 'event', 'repair'
  ];
  const handleSelectTag = (i) => {
    if(selectedTags.indexOf(tags[i]) == -1) {
      setSelectedTags([...selectedTags , tags[i]])
    }
  }
  
  return (
    <div>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wider' >Showcase Your Business</motion.span>
            </div>
        </div>

        <div className="bg-white flex items-center justify-center flex-wrap p-5 gap-10 ">
                <motion.div
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                className="bg-white flex flex-col gap-5  border-gray-200 p-6 basis-[450px]">
                    <div className="overflow-hidden flex items-center justify-center">
                        <img
                            src=""
                            className="object-cover w-full bg-cover bg-center" 
                            alt="women empowerment"
                            />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{opacity : 0 , y : 50}}
                    animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                    className=" bg-white p-3 items-center gap-2 justify-center basis-[350px] flex flex-col "
                >

                    <span className=" text-xl tracking-wider w-full  capitalize text-center"> CREATE AN ARTICLE </span>
                    <div  className="flex flex-col gap-4 w-full">
                        <input

                            type="text"
                            required
                            placeholder="title"
                            className="w-full placeholder-shown tracking-wider p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                        />
                        <select name="business-type"
                              className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"

                        >
                          <option value="retail">Retail</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="tech">Tech</option>
                          <option value="consulting">Consulting</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="automotive">Automotive</option>
                          <option value="hospitality">Hospitality</option>
                        </select>

                        <span className="text-xs text-gray-700 text-opacity-50">select tags related to your business that all users can easly search your business </span>
                        <div className="flex flex-wrap gap-2 p-2 ">
                            {tags.map((tag , index) => (
                                <div key={index} onClick={() => handleSelectTag(index)} className={`rounded-lg ${selectedTags.indexOf(tag) !== -1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border px-2 py-1 cursor-pointer  hover:bg-blue-500 hover:text-white border-blue-400 text-[0.5em]`}>{tag}</div>
                            ))}
                        </div>

                        <button onClick={() => setShowSection(true)} type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                            {"NEXT"}
                        </button>
                    </div>
                </motion.div>


            </div>

    
    </div>
  )
}

export default CreateBusiness