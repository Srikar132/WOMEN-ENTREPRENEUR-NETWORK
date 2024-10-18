import React from 'react'
import { useStore } from '../store'
import { HOST } from '../utils/constants';
import { AiOutlineEdit , AiOutlinePlus } from 'react-icons/ai';
import { apiClient } from '../lib/api-clinet.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countriesWithStates } from '../lib/utils';
function ProfileViewAndEdit() {
    const {userInfo} = useStore();
    const [profileImage, setProfileImage] = useState(null)
    const [country , setCountry] = useState("India")
    const [state , setState ] = useState("Andhra pradesh")
    const [bio, setBio] = useState("")
    const [phone, setPhone] = useState("")
    const [notifications, setNotifications] = useState(false)
    const [role, setRole] = useState("visitor")
    const [facebook, setFacebook] = useState("")
    const [instagram, setIntagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [category , setCategory] = useState("Technology")
    const [loading , setLoading] = useState(false);
    const [showEditForm , setShowEditForm] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {profileImage , role , bio , phone , country , state , facebook , instagram , twitter , notifications , category }
        const formData = new FormData();
        Object.keys(obj).map((key , index) => {
            formData.append(key , obj[key])
        })

        try {
            setLoading(true);
            const response = await apiClient.post(SETUP_PROFILE,formData,{withCredentials : true});
            if(!response.data.success) {
                toast.error(response.data.message);
                setLoading(false);
                return;
            }
            toast.success("Profile updated successfully");
            navigate("/")
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div>
        <div className="flex gap-4  w-fit flex-col ">
            <div className="rounded-full border h-96 w-96 overflow-hidden">
                <img src={`${HOST}/${userInfo?.profileImage}`} className="object-cover" alt="" />
            </div> 
            <div className='font-sans text-6xl tracking-wider uppercase  text-black'>{userInfo?.name}</div>
            <button onClick={() => setShowEditForm((prev) => !prev)} className="w-full gap-3 border rounded-lg flex items-center justify-center tracking-wider text-xl focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white  transition duration-200   py-2 bg-white text-black">
                   <AiOutlineEdit/> {showEditForm ? "cancel edit" : "Edit Profile"}
            </button>
        </div>
       {showEditForm &&  <form onSubmit={handleSubmit} className='flex overflow-scroll scrollbar-hide flex-col w-[400px] p-5 gap-5'>
                    {/* role , profile-image , bio , contact-info : {phone,address,social-links:{facebook,twitter,instagram}} ,preferences : {categories , notifications}    */}
                    {/* profile */}
                    <div className="flex justify-center group items-center ">
                        {profileImage ? (
                            <div className="flex flex-col gap-5">
                                <img className="h-40 w-40" src={URL.createObjectURL(profileImage)} alt="logo" />
                                <button onClick={() => setProfileImage(null)} className=" shadow-lg w-fit  px-3 flex items-center justify-center bg-white py-2 text-red-600" > <AiOutlineDelete/> delete upload</button>
                            </div>
                            ) : (
                            <div className="flex relative hover:bg-gray-200 cursor-pointer bg-gray-300 items-center rounded-full h-[100px] w-[100px] justify-center  placeholder-shown tracking-wider p-2 border border-dashed border-black  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"> 
                                <label htmlFor="logoImage" className="cursor-pointer"> 
                                <span className="font-semibold  text-[0.7em] whitespace-nowrap ">upload profile </span>
                                    <input onChange={handleFileChange} id="logoImage" name="logoImage" type="file"  className="hidden"  />
                                </label>
                                <AiOutlinePlus className='w-[50%] group-hover:block hidden  cursor-pointer pointer-events-none h-[50%] absolute'/>
                            </div>
                            )}
                    </div>
                    {/* role */}
                    <span className="text-xs text-gray-700 text-opacity-50">YOU ARE <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <div className="w-full flex gap-3">
                        <select value={role} onChange={(e) => setRole(e.target.value)}   className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" name="" id="">
                          <option value="visitor">visitor</option>
                          <option value="entrepreneur">entrepreneur</option>
                        </select>
                    </div>

                    <span className="text-xs text-gray-700 text-opacity-50">PROVIDE YOUR BIO <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <input
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        type="text"
                        placeholder="Provide your bio"
                        className="w-full h-56 p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    />
                    <span className="text-xs text-gray-700 text-opacity-50">CONTACT INFORMATION <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="phone number"
                        className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    />
                    <span className="text-xs text-gray-700 text-opacity-50">ADD YOUR SOCIAL LINKS <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <input
                        required
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        type="text"
                        placeholder="facebook profile link"
                        className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    />
                    <input
                        required
                        value={instagram}
                        onChange={(e) => setIntagram(e.target.value)}
                        type="text"
                        placeholder="instagram profile link"
                        className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    />
                    <input
                        required
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        type="text"
                        placeholder="twitter profile link"
                        className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white focus:border-blue-400 transition duration-200"
                    />



                    <span className="text-xs text-gray-700 text-opacity-50">choose your prefered category <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200"  >
                        <option value="technology">Technology</option>
                        <option value="health">Health</option>
                        <option value="sports">Sports</option>
                        <option value="arts">Arts</option>
                        <option value="music">Music</option>
                        <option value="travel">Travel</option>
                    </select>
                    <span className="text-xs text-gray-700 text-opacity-50">ADD YOUR LOCATION <span className="text-red-500 text-xl"> <sup>*</sup></span></span>
                    <div className="w-full flex gap-3">
                        <select value={country} onChange={(e) => setCountry(e.target.value)}  className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" name="" id="">
                          {Object.keys(countriesWithStates).map((country , index) => (
                            <option value={country} key={index}>{country}</option>
                          ))}
                        </select>
                        <select value={state} onChange={(e) => setState(e.target.value)}  className="w-full flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-4 cursor-pointer tracking-widest focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" name="" id="">
                          {countriesWithStates[country]?.map((state , index) => (
                            <option value={state} key={index}>{state}</option>
                          ))}
                        </select>
                    </div>

                    <div className="w-full flex items-center justify-between ">
                        <span className=" text-gray-900"> NOTIFICATIONS TO EMAIL</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input isChecked={notifications} onChange={() => setNotifications((prev) => !prev)} type="checkbox" class="sr-only peer" />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-blue-300  dark:peer-focus:ring-blue-800"></div>
                            <div class="absolute w-5 h-5 bg-white border border-gray-300 rounded-full transition-all peer-checked:translate-x-5 peer-checked:border-white"></div>
                        </label>
                    </div>

                    <button  type="submit" className="w-full flex items-center justify-center bg-blue-500 text-white py-2 hover:bg-blue-600">
                        { loading ? <div className="w-[25px] h-[25px] rounded-full border-[2px]  border-gray-200 border-t-black animate-spin transition-all duration-200" /> : "SET UP PROFILE"}
                    </button>

                    
        </form>}
    </div>
  )
}

export default ProfileViewAndEdit