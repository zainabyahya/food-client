import React, { useEffect } from 'react'
import { getChatroomByUser } from '../slices/chatroomSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ChatList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatrooms = useSelector((state) => state.chatroom.chatrooms)
    const currentUser = useSelector((state) => state.auth.currentToken);
    const userId = currentUser.userId;

    const getUser = (chatroom) => {
        const users = chatroom.users;
        const user = users?.find((user) =>
            user?._id?.toString() !== userId.toString()
        )
        return user;
    }

    const handleChatClick = (chatroomId) => {
        navigate(`/chats/${chatroomId}`);
    };

    useEffect(() => {
        dispatch(getChatroomByUser(userId));
    }, [dispatch, userId]);

    return (
        <div className='bg-white flex flex-col items-end justify-center w-full'>
            {
                chatrooms.map((chatroom, index) => {
                    const chatroomId = chatroom._id;
                    const user = getUser(chatroom);
                    return <div key={index} className={`w-full p-2 flex flex-row-reverse justify-start items-center gap-2 hover:bg-gray border-b-[1px] border-darkGray`} onClick={() => handleChatClick(chatroomId)} >
                        <img src={user.image} alt='profile' className='w-[3rem] h-[3rem]  rounded-full' />
                        <span className='text-xl'>{user.firstName} {user.lastName}</span>
                    </div>
                })
            }
        </div>
    )
}

export default ChatList