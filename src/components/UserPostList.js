import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogPostsByAuthor } from '../slices/blogSlice'
import PostCard from './PostCard'

const UserPostList = ({ userId }) => {
    const dispatch = useDispatch();
    const { blogPosts, loading, error } = useSelector((state) => state.food);

    useEffect(() => {
        dispatch(fetchBlogPostsByAuthor(userId));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='flex flex-wrap justify-end items-center gap-5'>
            {blogPosts &&
                blogPosts.map((post, index) => {
                    return <PostCard key={index} post={post} showImage={false} showUser={false} />
                })
            }
        </div>
    )
}

export default UserPostList