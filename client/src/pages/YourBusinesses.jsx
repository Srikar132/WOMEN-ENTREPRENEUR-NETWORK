import React, { useEffect, useState } from 'react'
import ProfileViewAndEdit from '../components/ProfileViewAndEdit'
import { AiOutlineDelete , AiOutlineMoneyCollect, AiOutlineDown, AiOutlineEdit } from 'react-icons/ai'
import { apiClient } from '../lib/api-clinet'
import { GET_BUSINESSES_BY_USERID } from '../utils/constants'
import { toast } from 'react-toastify'
import Business from './Business'
import { Link } from 'react-router-dom'
function YourBusinesses() {
  const [businesses , setBusinesses] = useState([])
  const getBussinesses = async () => {
    try {
      const response  = await apiClient.get(GET_BUSINESSES_BY_USERID , {withCredentials : true});
      setBusinesses(response.data)
      console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getBussinesses();
  } , [])

  return (
    <div className='min-h-screen    bg-white'>
      <div className='container flex flex-wrap w-full h-full  mx-auto'> 
        <ProfileViewAndEdit/>

        <div className='flex-1 flex gap-5  flex-col p-3'>
          <div className='flex w-full gap-4 items-center'> 
              <input  placeholder="search" type="text"  className="w-full flex-1 p-2 border border-gray-300   focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400 transition duration-200" />
              <Link to={"/business/post-business"} className="bg-blue-500 h-full rounded-lg hover:bg-blue-600 flex gap-2 items-center justify-center text-xl basis-[100px] text-white"> <AiOutlineMoneyCollect/>new</Link>
          </div>
          {businesses?.map((business , index) => (
            <div key={index} className="w-full p-5 items-center relative rounded-e-md shadow-sm   hover:bg-gray-100 cursor-pointer flex  border ">
              <div className='flex-1 flex gap-3 flex-col'>
                <span className='uppercase font-semibold text-3xl text-blue-500'>{business?.name}</span>
                <span className='uppercase text-xs'>{business?.description}</span>
              </div>
              <div className=''>
                <AiOutlineDown/>
              </div>

              <div className="absolute top-[-10%] right-10">
                <div className="flex gap-3">
                  <button className='text-2xl'><AiOutlineDelete/></button>
                  <button className='text-2xl'><AiOutlineEdit/></button>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

    </div>
  )
}

export default YourBusinesses