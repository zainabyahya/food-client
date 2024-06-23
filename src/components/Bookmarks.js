import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBookmarksByUserId } from '../slices/bookmarkSlice';
import PostCard from "./PostCard"
const Bookmarks = () => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmark.userBookmarks);
    const currentUser = useSelector((state) => state.auth.currentToken);
    const userId = currentUser.userId;

    useEffect(() => {
        dispatch(getBookmarksByUserId(userId))
    }, [dispatch])

    return (
        <div className='w-4/5 flex flex-col items-end justify-center p-10 gap-10'>
            <h1 className='text-2xl font-bold'>المنشورات المفضلة</h1>
            <div className=' flex flex-wrap flex-row-reverse gap-10 justify-start'>
                {bookmarks &&
                    bookmarks.map((post, index) => {
                        return <PostCard key={index} post={post} showImage={false} showUser={true} />
                    })
                }
            </div>
        </div>
    )
}

export default Bookmarks