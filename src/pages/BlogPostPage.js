import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostById } from '../slices/blogSlice';
import PostDetails from '../components/PostDetails';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import { BsArrowRight } from "react-icons/bs";

const BlogPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const { singlePost, loading, error } = useSelector((state) => state.blog);
    const currentUser = useSelector(state => state.auth.user)


    const handleNavigate = (e) => {
        navigate("/community")
    }
    useEffect(() => {
        dispatch(getBlogPostById(postId));
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='bg-primary'>
            <div className=' pb-10 px-10 lg:px-20 flex flex-col items-end lg:w-4/5 m-auto'>
                <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5' onClick={(e) => handleNavigate()} >
                    <BsArrowRight />
                    <span className='cursor-pointer' >العودة</span>
                </div>
                {singlePost &&
                    <div className='w-full bg-white rounded-md p-10'>
                        <PostDetails post={singlePost} />
                        <CommentList post={singlePost} />
                        {/* {currentUser && <AddComment postId={singlePost._id} />} */}
                        <AddComment postId={singlePost._id} />
                    </div>
                }
            </div>
        </div >
    )
}

export default BlogPostPage