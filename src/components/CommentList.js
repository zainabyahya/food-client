import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPost } from "../slices/commentSlice"
import CommentItem from './CommentItem';


const CommentList = ({ post }) => {
    const postId = post._id;
    const dispatch = useDispatch();
    const commentsList = useSelector((state) => state.comment.comments);
    const currentUser = useSelector((state) => state.auth.currentToken);

    const checkOwner = (comment) => {
        return comment.user._id === currentUser.userId;
    }
    useEffect(() => {
        dispatch(fetchCommentsByPost(postId));
    }, [dispatch, postId]);
    return (
        <div className='w-full flex flex-col items-end justify-center gap-3'>
            <span className='font-bold'>التعليقات</span>
            <hr className=' w-full border-[1px] border-darkGray' />
            {commentsList &&
                commentsList.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        isAuthor={checkOwner(comment)}
                    />
                ))
            }
        </div>
    )
}

export default CommentList