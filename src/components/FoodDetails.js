import React from 'react'
import image from '../assets/k.jpeg';
import { IoLocationOutline, IoTimeOutline, IoStar } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
// import { useNavigate } from 'react-router-dom';


const FoodDetails = () => {
    // const navigate = useNavigate();
    return (
        <div className='bg-primary pb-10 px-10 lg:px-20 flex flex-col items-end'>
            <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5'>
                <BsArrowRight />
                <span className='cursor-pointer' >العودة</span>
            </div>
            <div className='flex flex-col lg:flex-row-reverse bg-white w-full min-h-[80vh] p-10 lg:p-20 rounded-lg'>
                <img src={image} alt='food' className='h-1/2 lg:h-auto lg:w-1/3 object-cover overflow-hidden rounded-lg' />
                <div className='lg:w-1/3 flex flex-col justify-center lg:justify-start items-end  gap-5 py-10 lg:py-0 lg:px-10 lg:text-lg xl:text-xl lg:text-end'>
                    <span className='w-full flex flex-row-reverse justify-between items-center  gap-5 py-2'>
                        <h1 className='text-secondary text-xl lg:text-3xl xl:text-6xl'>كبة مقلية</h1>
                        <button className='bg-secondary text-white px-5 lg:py-1 xl:py-4 rounded-lg'>اطلب الآن</button>
                    </span>
                    <span className='flex flex-row-reverse justify-start items-center gap-5 py-2'>
                        <span className='text-[#9e9d9d] '> زينب ليث</span>
                        <span className='flex flex-row-reverse justify-center items-center gap-3'><IoStar className='text-[#FFCD3C]' /><span> ٤.٥</span></span>
                    </span>
                    <span className='flex flex-col justify-start items-end gap-1 py-2'>
                        <span > :الملاحظات</span>
                        <span > عدد القطع ٨ وبقيت في الثلاجة لمدة يومين</span>

                    </span>
                    <span className='flex flex-row-reverse justify-center items-center gap-3'><IoLocationOutline className='text-primary' /> ٢٤ كم</span>
                    <span className='flex flex-row-reverse justify-center items-center lg:items-start gap-3'><IoTimeOutline className='text-primary' /> الاستلام قبل ساعة ٦</span>
                </div>
                <div className='lg:w-1/3 h-full'>
                    <img src={image} alt='food' className='h-1/2 lg:h-auto lg:w-1/3 object-cover overflow-hidden rounded-lg' />

                </div>
            </div>

        </div >
    )
}

export default FoodDetails