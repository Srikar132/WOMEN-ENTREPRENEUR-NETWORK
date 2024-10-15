import {Link} from "react-router-dom"
import {motion} from "framer-motion"
import {FaAngleDown ,} from "react-icons/fa"
import {AiOutlineMenu , AiOutlineDown ,} from "react-icons/ai"
import { useEffect, useState , useRef } from "react"
import { navItems } from "../../utils/constants.js"
function Navbar() {
  const [section, setsection] = useState(-1);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
        if(boxRef && !boxRef.current.contains(event.target)) {
            setsection(-1);
        }
    }

    document.addEventListener("mousedown", handleClick)

    return (() => {
        document.removeEventListener("mousedown", handleClick)
    })


  }  , []);

  
  return (
    
    <div className='bg-white flex items-center justify-center h-[65px]'>
        <motion.div 
            initial={{opacity : 0 , y : 10}}
            animate={{opacity : 1 , y : 0}}
            exit={{opacity : 0}}
            className="lg:max-w-[1300px]  w-full lg:w-fit  h-full p-3 lg:p-0  flex items-center  md:gap-x-16 lg:gap-x-36  justify-between">

            <div className="lg:hidden block">
                <AiOutlineMenu/>
            </div>

            <div className="logo p-2">
                <Link to="/">
                    LOGO
                </Link>
            </div> 

            <nav className="h-full hidden lg:block">
                <ul className="flex gap-5 items-center justify-center">
                    {Object.keys(navItems).map((key , index) => (
                        <>
                            <motion.li onClick={() => setsection((prev) => prev = prev == index ? -1 : index)} className="relative  flex items-center gap-2 justify-between p-1 py-5 hover:border-b-[2px] hover:border-blue-500 hover cursor-pointer "> 
                                <FaAngleDown/> <span className=" capitalize">{key}</span>  

                                {index == section && 
                                
                                <motion.div
                                    ref={boxRef}
                                    className="absolute  left-[-50%] top-[110%] bg-white shadow-xl px-1 py-1 w-[200%] ">
                                        <ul className="flex flex-col items-center w-full ">
                                            {navItems[key].map((obj , index ) => {
                                                return (
                                                    <Link to={`${obj.path}`} className="px-3 w-full hover:bg-gray-100 py-2 text-xs flex items-center justify-between">  <span>{obj.name}</span>  </Link>
                                                )
                                            })}
                                        </ul>
                                </motion.div>}

                            </motion.li>
                        </>
                    ))}
                    {/*
                    <li className="flex items-center gap-2 justify-between p-1 py-5 hover:border-b-[2px] hover:border-blue-500 hover cursor-pointer "> <FaAngleDown/> <span className=" capitalize">Resource hub</span>  </li>
                    <li className="flex items-center gap-2 justify-between p-1 py-5 hover:border-b-[2px] hover:border-blue-500 hover cursor-pointer "> <FaAngleDown/> <span className=" capitalize">For Employees</span>  </li>
                    <li className="flex items-center gap-2 justify-between p-1 py-5 hover:border-b-[2px] hover:border-blue-500 hover cursor-pointer "> <FaAngleDown/> <span className=" capitalize">community</span>  </li> */}
                </ul>
            </nav>

            <div className="flex items-center  gap-2 justify-between p-2">
                <button className="bg-blue-500 text-white py-2 px-5 font-semibold lg:text-xl hover:bg-blue-400 shadow-lg tracking-wider flex items-center justify-center">Join</button>
                <button className="border text-blue-500 border-blue-500 py-2 px-3 lg:px-5 font-semibold lg:text-xl hover:bg-blue-500 hover:text-white  tracking-wider flex items-center justify-center">sign in</button>
            </div>   
        </motion.div>

    </div>
  )
}

export default Navbar