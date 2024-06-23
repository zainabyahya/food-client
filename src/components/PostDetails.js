import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IoPencil, IoTrash } from "react-icons/io5";
import FormattedContent from './FormattedContent';
import { handleBookmark, getAllBookmarks, getBookmarksByUserId } from "../slices/bookmarkSlice";
import { deleteBlogPost } from '../slices/blogSlice';

const PostDetails = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentToken);
    const userId = currentUser.userId;
    const { postId } = useParams();
    console.log("🚀 ~ PostDetails ~ postId:", postId)
    // const postId = post._id;
    const [saved, setSaved] = useState(false);
    // let bookmarks = useSelector((state) => state.bookmark.bookmarks);
    let bookmarks = useSelector((state) => state.bookmark.userBookmarks);

    console.log("🚀 ~ PostDetails ~ bookmarks:", bookmarks)

    console.log("🚀 ~ PostDetails ~ currentUser:", currentUser)
    const author = post.author;
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
        console.log("🚀 ~ handleBookmarkBtn ~ newBookmark:", newBookmark)
        setSaved(!saved);

        dispatch(handleBookmark(newBookmark));
    }

    useEffect(() => {
        // dispatch(getAllBookmarks());
        if (currentUser) dispatch(getBookmarksByUserId(userId))
    }, [dispatch]);

    useEffect(() => {
        if (currentUser && bookmarks) {
            // const bookmark = bookmarks.some(bookmark => bookmark.user === currentUser.userId &&
            //     bookmark.posts.some(post => post._id === postId)
            // );
            // const bookmark = bookmarks.posts.some((posts) => post._id === postId);
            // console.log("-----" + bookmark);
            // setSaved(bookmark);
        }
    }, [bookmarks]);

    let isAuthor = false;
    if (currentUser && author) {
        isAuthor = currentUser.userId && post.author._id === currentUser.userId;
    }

    return (
        <div className='bg-white w-full min-h-[80vh]'>
            {author &&
                <div className='flex flex-col items-end gap-5  p-10 lg:p-20 rounded-lg'>

                    <div className='flex flex-row-reverse justify-between items-center w-full '>
                        {author &&
                            <div className='flex flex-row-reverse justify-center items-center gap-2'>
                                <img src={author.image} alt='profile' className='w-[3rem] h-[3rem]  rounded-full' />
                                <span className='text-xl'>{author.firstName} {author.lastName}</span>
                            </div>
                        }
                        <div className='flex flex-row-reverse gap-2'>
                            {isAuthor && (
                                <div className='flex gap-2'>
                                    <button onClick={handleEdit} className='text-secondary'>
                                        <IoPencil />
                                    </button>
                                    <button onClick={handleDelete} className='text-secondary'>
                                        <IoTrash />
                                    </button>
                                </div>
                            )} {
                                currentUser && <button onClick={handleBookmarkBtn} className='text-secondary'>
                                    {saved ? <FaBookmark />
                                        : <FaRegBookmark />
                                    }
                                </button>
                            }
                        </div>
                    </div>
                    {post.image ?
                        <img src={post.image} alt="post" className='rounded-md w-full h-auto object-cover overflow-hidden' />
                        : <p>Loading ..</p>
                    }                    <div className='flex flex-col justify-center items-end'>
                        <h1 className='text-bold text-2xl text-end'> {post.title}</h1>
                        <FormattedContent className='text-end' content={post.content} />

                    </div>
                </div>
            }
        </div>
    )
}

export default PostDetails