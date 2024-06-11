import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../slices/commentSlice';
const AddComment = ({ postId }) => {

    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.user)

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            commentText: comment,
            post: postId
        };

        dispatch(addComment(newComment));

        setComment('');
    };

    return (
        <form onSubmit={(e) => handleComment(e)} className='w-full flex flex-row-reverse justify-center  items-center gap-2'>
            <input
                className='border-[1px] border-gray py-2 px-2 w-11/12 rounded-md'
                type='text'
                placeholder='اكتب هنا'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type='submit' className='bg-secondary text-white py-2 px-1 w-1/12 rounded-md' >
                +
            </button>
        </form>
    )
}

export default AddComment