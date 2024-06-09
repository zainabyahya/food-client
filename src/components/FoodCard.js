import React from 'react'
import image from '../assets/k.jpeg';
import { IoLocationOutline, IoTimeOutline, IoStar } from "react-icons/io5";


const FoodCard = () => {
    return (
        <div className='bg-gray w-[20rem] rounded-md'>
            <img src={image} alt='food' />
            <div className='flex flex-col items-end justify-center p-5'>
                <h1 className='text-bold text-2xl'> كبة مقلية</h1>
                <span className='text-[#9e9d9d]'> زينب ليث</span>
                <span className='flex flex-row-reverse justify-center items-center gap-3'><IoLocationOutline className='text-primary' /> ٢٤ كم</span>
                <span className='flex flex-row-reverse justify-center items-center gap-3'><IoTimeOutline className='text-primary' /> الاستلام قبل ساعة ٦</span>
                <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /> ٤،٥</span>
            </div>
        </div>
    )
}

export default FoodCard