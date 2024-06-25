import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../components/AddPost';  // Adjust the path as needed
import { fetchBlogPosts } from '../slices/blogSlice';
import PostCard from '../components/PostCard';
import ReactPaginate from 'react-paginate';

const Community = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { blogPosts, loading, error } = useSelector((state) => state.blog);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        dispatch(fetchBlogPosts());
    }, [dispatch])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    const offset = currentPage * itemsPerPage;
    const currentItems = blogPosts.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(blogPosts.length / itemsPerPage);



    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className='w-3/5 m-auto flex flex-col items-center justify-center gap-5 p-5'>
            <div className=' self-end'>
                <button onClick={handleOpenModal} className="bg-secondary text-white p-3 rounded-md">
                    + إضافة منشور
                </button>
                <AddPost isOpen={isModalOpen} onRequestClose={handleCloseModal} />
            </div>
            <div className='w-full flex flex-col items-end justify-center gap-5'>
                {
                    currentItems.map((blogPost, index) => {
                        return <PostCard key={index} post={blogPost} showImage={true} showUser={true} />
                    })
                }

            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}

export default Community