import React, { useEffect, useState } from 'react'
import { IoLocationOutline, IoTimeOutline, IoStar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import getAverageRating from '../utils/rating';
import { useSelector } from 'react-redux';
import { getDistance } from '../utils/getDistance';

const FoodCard = ({ post }) => {
    const navigate = useNavigate();

    const handleFoodClick = () => {
        navigate(`/food/${post._id}`);
    };
    const userLocation = useSelector((state) => state.auth.location)
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        if (post.location && userLocation) {
            const computedDistance = getDistance(userLocation, post.location);
            setDistance(computedDistance);
        }
    }, [post.location, userLocation]);

    return (
        <div>
            {
                post &&
                <div className='bg-gray w-[22rem] rounded-md h-[27rem]' onClick={handleFoodClick}>
                    <img src={post.image} className='h-[15rem] w-auto object-cover rounded-t-md ' alt='food' />
                    <div className='flex flex-col items-end justify-center p-5 gap-2'>
                        <h1 className='text-bold text-2xl'> {post.title}</h1>
                        <span className='text-[#9e9d9d]'>{post.owner.firstName} {post.owner.lastName}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'>
                            <IoLocationOutline className='text-primary' />
                            {userLocation === null
                                ? 'حدد موقعك لحساب المسافة'
                                : distance === null
                                    ? 'جاري التحميل...'
                                    : `${distance} km`}
                        </span>                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoTimeOutline className='text-primary' />{post.time}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /> {getAverageRating(post.owner.ratingSum, post.owner.ratingCount)}</span>
                    </div>
                </div>
            }
        </div>

    )
}

export default FoodCard