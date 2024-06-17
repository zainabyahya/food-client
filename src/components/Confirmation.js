import React, { useEffect } from 'react'
import { IoClose, IoCheckmarkOutline } from "react-icons/io5";
import { updateConfirmation } from '../slices/confirmationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';


const Confirmation = ({ confirmation }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const status = confirmation.status;
    const isPending = status === "pending" || "partiallyConfirmed";
    const handleConfirm = () => {
        if (user.userId === confirmation.user) {
            dispatch(updateConfirmation({ "confirmByUser": true }))
        } else if (user.userId === confirmation.owner) {
            dispatch(updateConfirmation({ "confirmByOwner": true }))
        }
    }
    const handleReject = () => {
        if (user.userId === confirmation.user) {
            dispatch(updateConfirmation({ "confirmByUser": false }))
        } else if (user.userId === confirmation.owner) {
            dispatch(updateConfirmation({ "confirmByOwner": false }))
        }
    }

    useEffect(() => {
    }, [status])

    return (
        <div>
            {
                isPending &&
                <div className='flex flex-row-reverse justify-between items-center gap-2 text-white bg-secondary'>
                    <span>تم الإتفاق</span>
                    <div>
                        <IoCheckmarkOutline onClick={handleConfirm} />
                        <IoClose onClick={handleReject} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Confirmation