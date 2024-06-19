import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IoLocationOutline, IoTimeOutline, IoStar } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { getFoodPostById } from '../slices/foodSlice';
import { selectUser } from '../slices/authSlice';
import { createConfirmation } from '../slices/confirmationSlice';

const FoodDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { foodPostId } = useParams();
    console.log("🚀 ~ FoodDetails ~ postId:", foodPostId)
    const { foodPost, loading, error } = useSelector((state) => state.food);
    console.log("🚀 ~ FoodDetails ~ foodPost:", foodPost)
    const currentUser = useSelector(selectUser);
    const handleOrder = () => {
        const ownerId = foodPost.owner._id;
        const orderInfo = {
            user: currentUser._id,
            owner: ownerId,
            post: foodPostId,
        }

        dispatch(createConfirmation(orderInfo));
        navigate(`/chats/${ownerId}`)

    }
    useEffect(() => {
        dispatch(getFoodPostById(foodPostId));
    }, [dispatch]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='bg-primary pb-10 px-10 lg:px-20 flex flex-col items-end'>
            <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5'>
                <BsArrowRight />
                <span className='cursor-pointer' >العودة</span>
            </div>
            {foodPost && <div className='flex flex-col lg:flex-row-reverse bg-white w-full min-h-[80vh] p-10 lg:p-20 rounded-lg'>
                <img src={foodPost.image} alt='food' className='h-1/2 lg:h-auto lg:w-1/3 object-cover overflow-hidden rounded-lg' />
                <div className='lg:w-1/3 flex flex-col justify-center lg:justify-start items-end  gap-5 py-10 lg:py-0 lg:px-10 lg:text-lg xl:text-xl lg:text-end'>
                    <span className='w-full flex flex-row-reverse justify-between items-center  gap-5 py-2'>
                        <h1 className='text-secondary text-xl lg:text-3xl xl:text-6xl'> {foodPost.title}</h1>
                        {currentUser &&
                            <button className='bg-secondary text-white px-5 lg:py-1 xl:py-3 rounded-lg' onClick={handleOrder}>اطلب الآن</button>
                        }                    </span>
                    <span className='flex flex-row-reverse justify-start items-center gap-5 py-2'>
                        <span className='text-[#9e9d9d] '> {foodPost.owner.firstName} {foodPost.owner.lastName} </span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /><span> {foodPost.owner.rating}</span></span>
                    </span>
                    <span className='flex flex-col justify-start items-end gap-1 py-2'>
                        <span > :الملاحظات</span>
                        <span > {foodPost.notes}</span>

                    </span>
                    <span className='flex flex-row-reverse justify-center items-center gap-3'><IoLocationOutline className='text-primary' /> {foodPost.location.longitude}</span>
                    <span className='flex flex-row-reverse justify-center items-center lg:items-start gap-3'><IoTimeOutline className='text-primary' /> {foodPost.time}</span>
                </div>
                <div className='lg:w-1/3 h-full'>
                    <img src={foodPost.image} alt='food' className='h-1/2 lg:h-auto lg:w-1/3 object-cover overflow-hidden rounded-lg' />

                </div>
            </div>}

        </div >
    )
}

export default FoodDetails