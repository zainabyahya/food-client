import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../slices/commentSlice';
import { IoPencil, IoTrash } from 'react-icons/io5';

const CommentItem = ({ comment, isAuthor }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.commentText);
    const [loading, setLoading] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await dispatch(updateComment({ ...comment, commentText })).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        dispatch(deleteComment(comment._id));
    };

    return (
        <div className='py-2 w-full text-end'>
            <h1 className='font-bold mb-١'> {comment.user.firstName} {comment.user.lastName}</h1>
            <div className='w-full flex flex-row-reverse justify-between items-center p-3'>
                {isEditing ? (
                    <div className='flex flex-col items-end w-full'>
                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            className='bg-secondary text-white p-3 rounded-md mt-2'
                            onClick={handleUpdate}
                            disabled={loading}
                        >

                            {loading ? 'جاري التحديث...' : 'تحديث التعليق'}
                        </button>
                    </div>
                ) : (
                    <p className='text-مل'> {comment.commentText}</p>
                )}
                {isAuthor && !isEditing && (
                    <div>
                        <button
                            className='text-blue-500 mt-2 text-secondary'
                            onClick={handleEditToggle}
                        >
                            <IoPencil />
                        </button>
                        <button onClick={handleDelete} className='text-secondary'>
                            <IoTrash size={"1.5rem"} />
                        </button>
                    </div>
                )}
            </div>
            <hr />

        </div>
    );
};

export default CommentItem;
