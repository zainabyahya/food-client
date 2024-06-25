import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogPostsByAuthor } from '../slices/blogSlice'
import PostCard from './PostCard'

const UserPostList = ({ userId, limit }) => {
    const dispatch = useDispatch();
    const { blogPosts, loading, error } = useSelector((state) => state.blog);
    useEffect(() => {
        dispatch(fetchBlogPostsByAuthor(userId));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {limit ?
                <div className='w-full flex flex-wrap justify-end items-center gap-5'>
                    {blogPosts &&
                        blogPosts.slice(0, 4).map((post, index) => {
                            return <PostCard key={index} post={post} />
                        })
                    }
                </div> :
                <div className='w-full flex flex-wrap justify-end items-center gap-5'>
                    {blogPosts &&
                        blogPosts.map((post, index) => {
                            return <PostCard key={index} post={post} />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default UserPostList