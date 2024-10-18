import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStore } from '../store'

function Home() {
    const {userInfo} = useStore();

  return (
    <>
        <main className='min-h-screen'>
            {userInfo?.email}
        </main>
        

    </>
  )
}

export default Home