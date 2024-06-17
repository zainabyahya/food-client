import React, { useEffect } from 'react'
import { getAllFoodPosts } from '../slices/foodSlice'
import { useDispatch, useSelector } from 'react-redux';
import FoodCard from './FoodCard';

const FoodList = () => {
    const dispatch = useDispatch();
    const foodPosts = useSelector((state) => state.food.foodPosts)

    useEffect(() => {
        dispatch(getAllFoodPosts());
    }, [dispatch]);
    return (
        <div className=' flex flex-wrap flex-row-reverse gap-10 justify-center p-5'>
            {
                foodPosts.map((post, index) => {
                    return <FoodCard key={index} post={post} />
                })
            }
        </div>
    )
}

export default FoodList