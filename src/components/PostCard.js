import React, { useState } from 'react'
import image from '../assets/1.jpeg';
// import { FaRegCommentAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";
import FormattedContent from './FormattedContent'; // 
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, showImage, showUser }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(`/community/${post._id}`);
    };
    return (
        <div className={`bg-gray ${showImage ? "w-full" : "w-[22srem]"}`}>
            {post.author &&
                <div className='p-5 flex flex-col justify-center items-end gap-10 rounded-md' >
                    {showUser && <div className='flex flex-row-reverse justify-center items-center gap-2'>
                        <img src={post.author.image} alt='profile' className='w-[3rem] rounded-full' />
                        <span className='text-xl'>{post.author.firstName} {post.author.lastName}</span>
                    </div>}
                    {showImage &&
                        <img src={post.image} alt="post" className='rounded-md w-4/5 h-[15rem] object-cover overflow-hidden m-auto' />
                    }            <div className='flex flex-col justify-center items-end'>
                        <h1 className='text-bold text-2xl'> {post.title}</h1>
                        <FormattedContent className='text-end' content={post.content.substring(0, 100)} />
                        <span className='py-5 text-secondary hover:underline text-end' onClick={handlePostClick} > ..رؤية المزيد</span>
                    </div>

                </div>
            }
        </div>
    )
}

export default PostCard