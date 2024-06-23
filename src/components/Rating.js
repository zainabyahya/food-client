import React from 'react'
import StarRating from './StarRating';

const Rating = ({ confirmation }) => {
    const status = confirmation.status;
    const isConfirmed = status === "confirmed";

    return (
        <div>
            {isConfirmed && <div className='flex flex-row-reverse justify-between items-center gap-2 text-white bg-secondary'>
                <span>
                    قيم المستخدم
                </span>
                <StarRating />
            </div>
            }
        </div>
    )
}

export default Rating;