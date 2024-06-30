import React, { useEffect } from 'react'
import FoodList from '../components/FoodList'
import HeroSection from '../components/HeroSection'
import UserLocation from '../components/UserLocation'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const currentUser = useSelector((state) => state.auth.currentToken)
    return (
        <div>
            <HeroSection />
            {/* <div className='w-4/5 m-auto'> */}
            {currentUser && <UserLocation />}
            <FoodList />
            {/* </div> */}
        </div>
    )
}

export default HomePage