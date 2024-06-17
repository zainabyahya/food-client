import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../slices/authSlice'
import { getMessagesByChatroom } from '../slices/messageSlice'
import { getConfirmationByPostId } from './confirmationSlice';

const Chat = ({ chatroomId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages);
    const currentUser = useSelector(selectUser);
    const { confirmation } = useSelector((state) => state.confirmation);

    const isAuthor = (message) => {
        return message.user._id === currentUser.userId;
    }
    useEffect(() => {
        dispatch(getMessagesByChatroom(chatroomId));
        dispatch(getConfirmationByPostId(confirmation._id))
    }, [dispatch]);

    return (
        <div className='flex flex-col justify-center bg-gray p-5'>
            {
                messages.map((message) => {
                    const author = isAuthor(message);
                    if (author) {
                        return <span className='self-end bg-[#DCF1DE] rounded-l-md rounded-t-md p-1'></span>
                    } else {
                        return <span className='self-start bg-[#D9D9D9] rounded-r-md rounded-t-md p-1'></span>
                    }
                })
            }
        </div>
    )

}




export default Chat