import React from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";
import { updateConfirmation } from '../slices/confirmationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import StarRating from './StarRating';

const Rating = ({ confirmation }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const status = confirmation.status;
    const isConfirmed = status === "confirmed";

    return (
        <div>
            {isConfirmed && <div className='flex flex-row-reverse justify-between items-center gap-2 text-white bg-secondary'>
                <span>
                    قيم المستخدم
                </span>
                <StarRating />
            </div>}
        </div>
    )
}

export default Rating;