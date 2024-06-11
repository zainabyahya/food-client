import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../components/AddPost';  // Adjust the path as needed
import { fetchBlogPosts } from '../slices/blogSlice';
import PostCard from '../components/PostCard';

const Community = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { blogPosts, loading, error } = useSelector((state) => state.blog);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        dispatch(fetchBlogPosts());
    }, [dispatch])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className='w-3/5 m-auto flex flex-col items-end justify-center gap-5 p-5'>
            <div className='py-5'>
                <button onClick={handleOpenModal} className="bg-secondary text-white p-3 rounded-md">
                    + إضافة منشور
                </button>
                <AddPost isOpen={isModalOpen} onRequestClose={handleCloseModal} />
            </div>
            <div className='w-full flex flex-col items-end justify-center gap-5'>
                {
                    blogPosts.map((blogPost, index) => {
                        return <PostCard key={index} post={blogPost} showImage={true} showUser={true} />
                    })
                }
            </div>
        </div>
    )
}

export default Community