import {motion , AnimatePresence} from "framer-motion"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose , AiOutlineGoogle } from "react-icons/ai"
import image1 from "../assets/WOMEN-2.webp"
import image2 from "../assets/WOMEN-3.jpg"
import image3 from "../assets/WOMENENTRPRENERU-12.jpg"
import { REGISTER_ROUTE } from "../utils/constants"
import { toast } from "react-toastify"
import { apiClient } from "../lib/api-clinet"
function Register() {
    const navigate = useNavigate();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")

    const validateForm = () => {
        if(!email || !email.endsWith("@gmail.com")) {
            toast.error("Invalid email");
            return false;
        }
        if(!name) {
            toast.error("Enter your name");
            return false;
        }
        if(!password) {
            toast.error("Enter password");
            return false;
        }
        if(password !== conformPassword) {
            toast.error("enter correct password");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm() ) {
            try {
                setRegisterLoading(true)
                const response = await apiClient.post(REGISTER_ROUTE,{name , email , password} , {withCredentials : true}) ;

                if(!response.data.success) {
                    toast.error(response.data.message)
                    setRegisterLoading(false)
                    return ;
                }
                // 8985003051
                toast.success(response.data.message);
                setRegisterLoading(false);
                navigate("/auth/verify-email")
            } catch (error) {
                console.log(error.message)
                setRegisterLoading(false);
            }
        }
    }
    
  return (
    <div className="min-h-screen">
        <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm flex lg:p-24 lg:px-28 xl:p-28 xl:pb-16 xl:px-80">
            <AnimatePresence>
                <motion.div 
                    initial={{opacity : 0 , scale : 0}}
                    animate={{opacity : 1 , scale : 1}}
                    exit={{opacity : 0 , scale : 0}}
                    transition={{duration : 0.5 , ease : "backInOut"} }
                    className="flex-1 z-50 relative bg-gradient-to-t from-white via-white to-blue-100 overflow-hidden flex flex-col flex-wrap items-center rounded-xl bg-white "
                >  
                    <div className="flex flex-row w-full  items-center justify-end">
                        <Link to={"/"}><AiOutlineClose/></Link>
                    </div>

                    <img draggable="false" className="z-40 object-cover select-none pointer-events-none absolute left-[-10%] bottom-[-30%]" src={image2} alt="" />
                    <img draggable="false" className="z-40 hidden xl:block object-cover select-none pointer-events-none absolute right-5 bottom-9 h-96" src={image3} alt="" />
                    <img draggable="false" className="z-40  object-cover select-none pointer-events-none absolute right-[-10%] top-[-5%] h-96" src={image1} alt="" />

                    <div className="flex-1 z-50 flex justify-center items-center flex-col p-2 gap-5 w-[350px]">
                        <button className="w-full  flex items-center justify-between tracking-wider text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200  text-white  bg-blue-600">
                            <div className="border h-full px-2 py-2 text-blue-700 bg-white border-black">
                                <AiOutlineGoogle  /> 
                            </div>
                            <div className="flex-1 text-sm flex items-center justify-center">
                                sigup with google
                            </div>
                        </button>
                        <span className=" text-sm w-full gap-1 capitalize flex items-center"> <hr className="flex-1 text-black" /> or use own credentials to register <hr className="flex-1" /> </span>
                        <form  onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="name"
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                            />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                            />
                            <input
                                value={conformPassword}
                                onChange={(e) => setConformPassword(e.target.value)}
                                type="password"
                                placeholder="Conform Password"
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                            />
                            <button type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                                {registerLoading ? <div className="w-[25px] h-[25px] rounded-full border-[2px] border-dotted border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "sign up"}
                            </button>
                        </form>
                        <span className="text-gray-600 cursor-pointer  "> Already have an account ,<Link to="/auth/login" className="text-blue-500 cursor-pointer hover:underline "> login here </Link>  </span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

    </div>
  )
}

export default Register