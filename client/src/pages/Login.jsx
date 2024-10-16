import {motion} from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {AiOutlineGoogle} from "react-icons/ai"
import womenbg from "../assets/woemnemp.jpeg"
import {toast} from "react-toastify"
import { useState } from "react"
import { apiClient } from "../lib/api-clinet"
import { LOGIN_ROUTE } from "../utils/constants"
import { useStore } from "../store/index.js"

function Login() {
    const navigate = useNavigate();
    const [email , setEmail] = useState("") ;
    const [password  ,setPassword] = useState("");
    const {setUserInfo} = useStore();
    const [loginLoading , setLoginLoading] = useState(false);

    const validateForm = () => {
        if(!email || !email.endsWith("@gmail.com")) {
            toast.error("Invalid email");
            return false;
        }
        if(!password) {
            toast.error("Enter password");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm() ) {
            try {
                setLoginLoading(true)
                const response = await apiClient.post(LOGIN_ROUTE,{email , password} , {withCredentials : true}) ;

                if(!response.data.success) {
                    if(response.data.message === "email not found") {
                        toast.error("Invalid email")
                    }else if(response.data.message === "Incorrect password") {
                        toast.error("Invalid password")
                    }else {
                        toast.error("Network issue")
                    }
                    setLoginLoading(false)
                    return ;
                }
                // 8985003051
                console.log(response.data.user.isVerified)
                toast.success(response.data.message);
                if(response.data.user.isVerified == false) {
                    
                }
                setUserInfo(response.data.user);
                setLoginLoading(false);
            } catch (error) {
                toast.error("Network Issue")
                setLoginLoading(false);
            }
        }
    }

  return (
    <div className=''>
        <div className='h-[300px] flex items-center justify-center'>
            <div className='w-full p-5 flex items-center bg-white/20 backdrop-blur-sm justify-center'>
                <motion.span initial={{opacity : 0 , y : 50}} animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}} className='sm:mr-20 text-5xl font-bold tracking-wider' >Member Login</motion.span>
            </div>
        </div>

        <div className="bg-white flex items-center justify-center flex-wrap p-5 gap-10 ">
            <motion.div 
                initial={{opacity : 0 , y : 50}}
                animate={{opacity : 1 , y : 0}} exit={{opacity : 0 , y : 50}} transition={{ ease :"easeInOut" ,duration : 0.3}}
                className="login bg-white p-3 items-center gap-2 justify-center basis-[350px] flex flex-col "
            >
                <button className="w-full  flex items-center justify-between tracking-wider text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200  text-white  bg-blue-600">
                    <div className="border h-full px-2 py-2 text-blue-700 bg-white border-black">
                        <AiOutlineGoogle  />
                    </div>
                    <div className="flex-1 text-sm flex items-center justify-center">
                        sigin with google
                    </div>
                </button>
                <span className=" text-sm w-full gap-1 capitalize flex items-center"> <hr className="flex-1 text-black" /> or use eamil to login <hr className="flex-1" /> </span>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                    <button type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                        {loginLoading ? <div className="w-[25px] h-[25px] rounded-full border-[3px] border-gray-200 border-t-black animate-spin duration-500" /> : "login"}
                    </button>
                </form>
                <Link to="/" className="text-blue-500 cursor-pointer hover:underline "> i don't know my password </Link>
            </motion.div>

            <div className="bg-white flex flex-col gap-5 border border-gray-200 shadow-lg p-6 basis-[450px]">
                <div className="overflow-hidden h-52 flex items-center justify-center">
                    <img
                        src={womenbg}
                        className="object-cover w-full bg-cover bg-center" 
                        alt="women empowerment"
                        />
                </div>
                <h1 className="text-2xl">Get the happiness you deserve</h1>
                <p>No matter the challenge, you don't have to face it alone - but it’s up to you to take the first step.</p>
                <Link to={"/auth/register"} className="w-full flex items-center justify-center tracking-wider text-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200  text-white py-2 bg-blue-600">
                    Join us
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Login