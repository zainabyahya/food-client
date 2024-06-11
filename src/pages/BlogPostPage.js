import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostById } from '../slices/blogSlice';
import PostDetails from '../components/PostDetails';
import AddComment from '../components/AddComment';
import CommentList from '../components/CommentList';
import { BsArrowRight } from "react-icons/bs";


// import CommentList from '../components/CommentList';
// import NewComment from '../components/NewComment';
const BlogPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    console.log("🚀 ~ BlogPostPage ~ postId:", postId)

    const { singlePost, loading, error } = useSelector((state) => state.blog);
    const currentUser = useSelector(state => state.auth.user)
    console.log("🚀 ~ BlogPostPage ~ currentUser:", currentUser)

    useEffect(() => {
        dispatch(getBlogPostById(postId));
    }, [navigate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className='bg-primary'>
            <div className=' pb-10 px-10 lg:px-20 flex flex-col items-end lg:w-4/5 m-auto'>
                <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5'>
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