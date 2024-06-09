import React, { useState } from 'react'
import image from '../assets/1.jpeg';
import { FaRegCommentAlt, FaHeart, FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa";



const PostCard = () => {
    const [showImage, setShowImage] = useState(true);
    const [showUser, setShowUser] = useState(true);


    return (
        <div className='bg-gray w-3/5 p-5 flex flex-col justify-center items-end gap-10 m-auto rounded-md'>
            {showUser && <div className='flex flex-row-reverse justify-center items-center gap-2'>
                <img src={image} alt='profile' className='w-[3rem] rounded-full' />
                <span className='text-xl'>زينب ليث</span>
            </div>}
            {showImage &&
                <img src={image} alt="post" className='rounded-md w-4/5 h-[15rem] object-cover overflow-hidden m-auto' />
            }            <div className='flex flex-col justify-center items-end'>
                <h1 className='text-bold text-2xl'> ما هي الطرق التي يمكن بها استخدام قشر الموز بدلًا من رميه؟</h1>
                <p className='text-end'>
                    البستنة:
                    سماد طبيعي: يمكن وضع قشور الموز في التربة أو إضافتها إلى كومة السماد لزيادة محتوى التربة من البوتاسيوم والمغذيات الأخرى.
                    جذب الطيور: قطع قشور الموز إلى قطع صغيرة ووضعها في الحديقة لجذب الطيور.
                    طرد الحشرات: يمكن وضع قطع صغيرة من قشور الموز حول النباتات لردع .....
                </p>
                <span className='py-5 text-secondary hover:underline'>..رؤية المزيد</span>
            </div>
            <div className='self-start flex justify-center items-center gap-2 text-secondary'>
                <FaRegHeart className='cursor-pointer' />
                <FaRegBookmark className='cursor-pointer' />
                <FaRegCommentAlt className='cursor-pointer' />
            </div>
        </div>
    )
}

export default PostCard