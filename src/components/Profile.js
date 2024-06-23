import React, { useEffect } from 'react'
import { getUserById } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import UserFoodList from './UserFoodList'
import UserPostList from './UserPostList'
import getAverageRating from '../utils/rating'

const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserById(userId));
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='bg-primary pb-10 px-10 lg:px-20 '>
            {user && <div className='bg-white p-10 flex flex-col items-end justify-center gap-10'>
                <div className='flex flex-row-reverse justify-end items-center gap-5'>
                    <img src={user.image} alt='profile' className='w-[3rem] rounded-full' />
                    <div className='flex flex-col justify-center items-end'>
                        <span className='text-xl'>{user.firstName} {user.lastName}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /> {getAverageRating(user.ratingSum, user.ratingCount)}</span>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-end gap-5'>
                    <span className='text-xxl'>منشورات المجتمع</span>
                    <UserPostList userId={user._id} />
                </div>
                <div className='flex flex-col justify-center items-end gap-5'>
                    <span className='text-xxl'>الطعام</span>
                    <UserFoodList userId={user._id} />
                </div>
            </div>}


        </div >
    )
}

export default Profile