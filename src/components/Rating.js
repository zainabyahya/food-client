import React from 'react'
import StarRating from './StarRating';

const Rating = ({ otherUserId }) => {

    return (
        <div className='m-auto my-2  rounded-md p-2 w-2/5 flex flex-row-reverse justify-between items-center gap-2 text-white bg-secondary'>
            <span>
                قيم المستخدم
            </span>
            <StarRating otherUserId={otherUserId} />
        </div>
    )
}

export default Rating;