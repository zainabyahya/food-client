import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPost } from "../slices/commentSlice"


const CommentList = ({ post }) => {
    const postId = post._id;
    const dispatch = useDispatch();
    const commentsList = useSelector((state) => state.comment.comments);
    useEffect(() => {
        dispatch(fetchCommentsByPost(post._id));
    }, [dispatch, postId]);
    return (
        <div className='w-full flex flex-col items-end justify-center gap-3'>
            <span className='font-bold'>التعليقات</span>
            <hr className=' w-full border-[1px] border-darkGray' />
            {commentsList &&
                commentsList.map((comment, index) => (
                    <div key={index} className='py-2 w-full text-end'>
                        <h1 className='font-bold mb-3'> {comment.user.firstName} {comment.user.lastName}</h1>
                        <p>{comment.commentText}</p>
                        <hr />
                    </div>
                ))
            }
            <hr />
        </div>
    )
}

export default CommentList