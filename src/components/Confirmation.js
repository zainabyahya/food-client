import React, { useEffect } from 'react'
import { IoClose, IoCheckmarkOutline } from "react-icons/io5";
import { updateConfirmation } from '../slices/confirmationSlice';
import { useDispatch, useSelector } from 'react-redux';


const Confirmation = ({ confirmation }) => {
    const user = useSelector((state) => state.auth.currentToken);
    const dispatch = useDispatch();
    let status, isPending;
    if (confirmation) {
        status = confirmation.status;
        isPending = (status === "pending") || (status === "partiallyConfirmed");
    }
    const handleConfirm = () => {
        if (user.userId === confirmation.user) {
            dispatch(updateConfirmation({ confirmationId: confirmation._id, "confirmByUser": true }))
        } else if (user.userId === confirmation.owner) {
            dispatch(updateConfirmation({ confirmationId: confirmation._id, "confirmByOwner": true }))
        }
    }
    const handleReject = () => {
        if (user.userId === confirmation.user) {
            dispatch(updateConfirmation({ confirmationId: confirmation._id, "confirmByUser": false }))
        } else if (user.userId === confirmation.owner) {
            dispatch(updateConfirmation({ confirmationId: confirmation._id, "confirmByOwner": false }))
        }
    }
    return (
        <div className='w-1/4 self-center m-3 p-5 text-xl'>
            {
                isPending &&
                <div className='p-2 flex flex-row-reverse justify-between items-center gap-2 text-white bg-secondary rounded-md'>
                    <span>تم الإتفاق</span>
                    <div className='flex gap-2'>
                        <IoCheckmarkOutline onClick={handleConfirm} className='cursor-pointer' />
                        <IoClose onClick={handleReject} className='cursor-pointer' />
                    </div>
                </div>
            }
        </div>
    )
}

export default Confirmation