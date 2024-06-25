import React, { useEffect } from 'react'
import { getFoodPostByOwner } from '../slices/foodSlice'
import { useDispatch, useSelector } from 'react-redux'
import FoodCard from './FoodCard'

const UserFoodList = ({ userId, limit }) => {
    const dispatch = useDispatch();
    const { foodPosts, loading, error } = useSelector((state) => state.food);

    useEffect(() => {
        dispatch(getFoodPostByOwner(userId));
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {limit ?
                <div className='w-full flex flex-wrap justify-end items-center gap-5'>
                    {foodPosts &&
                        foodPosts.slice(0, 4).map((post, index) => {
                            return <FoodCard key={index} post={post} />
                        })
                    }
                </div> :
                <div className='w-full flex flex-wrap justify-end items-center gap-5'>
                    {foodPosts &&
                        foodPosts.map((post, index) => {
                            return <FoodCard key={index} post={post} />
                        })
                    }
                </div>
            }
        </div>
    )
}

export default UserFoodList