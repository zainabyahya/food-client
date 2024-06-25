import React, { useEffect } from 'react'
import FoodList from '../components/FoodList'
import HeroSection from '../components/HeroSection'
import UserLocation from '../components/UserLocation'
const HomePage = () => {

    return (
        <div>
            <HeroSection />
            {/* <div className='w-4/5 m-auto'> */}
            <UserLocation />
            <FoodList />
            {/* </div> */}
        </div>
    )
}

export default HomePage