import React from 'react'
import { IoLocationOutline, IoTimeOutline, IoStar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import getAverageRating from '../utils/rating';


const FoodCard = ({ post }) => {
    console.log("🚀 ~ FoodCard ~ post:", post)
    const navigate = useNavigate();

    const handleFoodClick = () => {
        navigate(`/food/${post._id}`);
    };

    return (
        <div>
            {
                post &&
                <div className='bg-gray w-[20rem] rounded-md h-[27rem]' onClick={handleFoodClick}>
                    <img src={post.image} className='h-[15rem] w-auto object-cover rounded-t-md ' alt='food' />
                    <div className='flex flex-col items-end justify-center p-5 gap-2'>
                        <h1 className='text-bold text-2xl'> {post.title}</h1>
                        <span className='text-[#9e9d9d]'>{post.owner.firstName} {post.owner.lastName}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoLocationOutline className='text-primary' /> {post.location.longitude}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoTimeOutline className='text-primary' />{post.time}</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /> {getAverageRating(post.owner.ratingSum, post.owner.ratingCount)}</span>
                    </div>
                </div>
            }
        </div>

    )
}

export default FoodCard