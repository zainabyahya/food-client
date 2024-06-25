import React, { useEffect, useState } from 'react'
import { getAllFoodPosts } from '../slices/foodSlice'
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import ReactPaginate from 'react-paginate';
import { getDistance } from '../utils/getDistance';

const FoodList = () => {
    const dispatch = useDispatch();
    const foodPosts = useSelector((state) => state.food.foodPosts)
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;
    const userLocation = useSelector((state) => state.auth.location);
    const [sortedPosts, setSortedPosts] = useState(null);

    useEffect(() => {
        if (userLocation && foodPosts.length > 0) {
            const postsWithDistances = foodPosts.map(post => {
                const distance = getDistance(userLocation, post.location);
                return { ...post, distance };
            });
            postsWithDistances.sort((a, b) => a.distance - b.distance);
            setSortedPosts(postsWithDistances);
        }
    }, [userLocation, foodPosts]);


    useEffect(() => {
        dispatch(getAllFoodPosts());
    }, [dispatch]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    };

    const offset = currentPage * itemsPerPage;
    const currentItems = sortedPosts ? sortedPosts.slice(offset, offset + itemsPerPage) : foodPosts.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(foodPosts.length / itemsPerPage);

    return (
        <div className='flex flex-col items-center p-5 mt-10 mx-1'>
            <div className='flex flex-wrap flex-row-reverse  gap-12 justify-center'>
                {currentItems.map((post, index) => (
                    <FoodCard key={index} post={post} />
                ))}
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

export default FoodList