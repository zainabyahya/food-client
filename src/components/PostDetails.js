import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { FaRegCommentAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IoPencil, IoTrash } from "react-icons/io5";

import FormattedContent from './FormattedContent';
import { handleBookmark, getAllBookmarks } from "../slices/bookmarkSlice";
import { deleteBlogPost } from '../slices/blogSlice';

const PostDetails = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [saved, setSaved] = useState(false);
    let bookmarks = useSelector((state) => state.bookmark.bookmarks);
    const currentUser = useSelector(state => state.auth.user)

    const handleEdit = () => {
        navigate(`/edit/${post._id}`);
    };
    const handleDelete = () => {
        dispatch(deleteBlogPost(postId));
        navigate("/");
    };
    const handleBookmarkBtn = () => {
        const newBookmark = {
            postId: postId
        }
        dispatch(handleBookmark(newBookmark));
        setSaved(!saved);
    }

    useEffect(() => {
        dispatch(getAllBookmarks());

    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            const bookmark = bookmarks.some(bookmark => bookmark.user === currentUser.userId &&
                bookmark.posts.some(post => post._id === postId)
            );
            setSaved(bookmark);
        }
    }, [bookmarks]);


    let isAuthor = false;
    if (currentUser) {
        isAuthor = currentUser.userId && post.author._id === currentUser.userId;
    }

    return (
        <div className='flex flex-col items-end gap-5 bg-white w-full min-h-[80vh] p-10 lg:p-20 rounded-lg'>
            <div className='flex flex-row-reverse justify-between items-center'>
                <div className='flex flex-row-reverse justify-center items-center gap-2'>
                    {/* <img src={post.author.image} alt='profile' className='w-[3rem] h-[3rem]  rounded-full' /> */}
                    {/* <span className='text-xl'>{post.author.firstName} {post.author.lastName}</span> */}
                </div>
                {isAuthor && (
                    <div className='flex gap-2'>
                        <button onClick={handleEdit} className='text-secondary'>
                            <IoPencil />
                        </button>
                        <button onClick={handleDelete} className='textsecondary'>
                            <IoTrash />
                        </button>
                    </div>
                )}
            </div>
            <img src={post.image} alt="post" className='rounded-md w-full h-auto object-cover overflow-hidden' />
            <div className='flex flex-col justify-center items-end'>
                <h1 className='text-bold text-2xl text-end'> {post.title}</h1>
                <FormattedContent className='text-end' content={post.content} />

            </div>
            <div className='self-start flex justify-center items-center gap-2'>
                {currentUser &&
                    <button onClick={handleBookmarkBtn} className='text-secondary'>
                        {saved ? <FaBookmark />
                            : <FaRegBookmark />
                        }
                    </button>
                }
            </div>
        </div>

    )
}

export default PostDetails