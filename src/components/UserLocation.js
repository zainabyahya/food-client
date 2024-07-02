import React, { useEffect } from 'react'
import useUserLocation from '../hooks/useUserLocation';
import { useDispatch } from 'react-redux';
import { setLocation } from '../slices/authSlice';
import { IoLocationOutline } from "react-icons/io5";

const UserLocation = () => {
    const dispatch = useDispatch();
    const { userLocation, getUserLocation, error } = useUserLocation();

    useEffect(() => {
        if (userLocation) {
            dispatch(setLocation(userLocation));
        }
    }, [userLocation, dispatch]);

    return (
        <div className=' w-11/12 m-auto flex justify-center overflow-hidden mt-10'>
            <span className=' w-full mx-10 bg-map rounded-md text-center cursor-pointer py-5 text-secondary font-bold text-xl' onClick={getUserLocation} value={userLocation}>
                {error ?
                    <span>
                        يرجى اعادة المحاولة
                    </span> :
                    <div className='flex justify-center items-center  gap-3' >
                        حدد موقعك
                        <IoLocationOutline />
                    </div>}
            </span>

        </div>
    )
}

export default UserLocation