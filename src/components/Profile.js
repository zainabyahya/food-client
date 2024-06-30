import React, { useEffect, useState } from 'react'
import { getUserById } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import UserFoodList from './UserFoodList'
import UserPostList from './UserPostList'
import getAverageRating from '../utils/rating'
import EditProfile from './EditProfile'

const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const currentUser = useSelector((state) => state.auth.currentToken);
    const [showMoreFood, setShowMoreFood] = useState(true);
    const [showMorePosts, setShowMorePosts] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    let isOwner = false;
    if (currentUser) {
        isOwner = userId === currentUser.userId;
    }
    useEffect(() => {
        dispatch(getUserById(userId));
    }, [dispatch]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='bg-primary pb-10 px-10 lg:px-20 '>
            {user &&
                <div className='bg-white p-20 flex flex-col items-end justify-center gap-10'>
                    <div className='flex flex-row-reverse justify-end items-center gap-5'>
                        <img src={user.image} alt='profile' className='w-[4rem] h-[4rem] rounded-full' />
                        <div className='flex flex-col justify-center items-end'>
                            <span className='text-xl'>{user.firstName} {user.lastName}</span>
                            <span className='flex flex-row-reverse justify-center items-center gap-3'>
                                <IoStar className='text-[#FFCD3C]' /> {getAverageRating(user.ratingSum, user.ratingCount)}
                            </span>
                            {
                                isOwner &&
                                <button onClick={handleOpenModal} className='text-secondary'>
                                    تعديل المعلومات
                                </button>
                            }
                        </div>
                    </div>
                    <EditProfile isOpen={isModalOpen} onRequestClose={handleCloseModal} user={user} />
                    <div className='flex flex-col justify-center items-end gap-5 w-full'>
                        <div className='flex flex-row-reverse justify-between items-center w-full'>
                            <span className='text-xxl'>منشورات المجتمع</span>
                            <button className="" onClick={() => setShowMorePosts(!showMorePosts)}>
                                {showMorePosts ? "عرض اكثر" : "عرض اقل "}
                            </button>
                        </div>
                        <UserPostList userId={user._id} limit={showMorePosts} />
                    </div>
                    <div className='flex flex-col justify-center items-end gap-5 w-full'>
                        <div className='flex flex-row-reverse justify-between items-center w-full'>
                            <span className='text-xxl'>منشورات الطعام</span>
                            <button className="" onClick={() => setShowMoreFood(!showMoreFood)}>
                                {showMoreFood ? "عرض اكثر" : "عرض اقل "}
                            </button>
                        </div>
                        <UserFoodList userId={user._id} limit={showMoreFood} />
                    </div>
                </div>
            }
        </div >
    )
}

export default Profile