import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessagesByChatroom } from '../slices/messageSlice'
import { getConfirmationByPostId, getConfirmationByUsersIds } from '../slices/confirmationSlice';
import { useParams } from 'react-router-dom';
import SendMessage from '../components/SendMessage';
import Confirmation from './Confirmation';
import { getChatroomsById } from '../slices/chatroomSlice';
import Rating from './Rating';

const Chat = () => {
    const { chatroomId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages);
    const chatroom = useSelector((state) => state.chatroom.chatroom);
    const currentUser = useSelector((state) => state.auth.currentToken);
    const { confirmation } = useSelector((state) => state.confirmation);
    console.log("🚀 ~ Chat ~ confirmation:", confirmation)
    const chatContainerRef = useRef(null);


    const isAuthor = (message) => {
        return message.user === currentUser.userId;
    }

    const otherUserId = chatroom ? chatroom.users.find(userId => userId !== currentUser.userId) : null;

    useEffect(() => {
        dispatch(getMessagesByChatroom(chatroomId));
        dispatch(getChatroomsById(chatroomId))
        if (chatroom) {
            console.log("🚀 ~ useEffect ~ chatroom:", chatroom)
            // dispatch(getConfirmationByPostId(confirmation._id))
            dispatch(getConfirmationByUsersIds(chatroom.users))
            console.log("🚀 ~ useEffect ~ chatroom.users:", chatroom.users)

        }
    }, [dispatch, chatroomId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="flex flex-col h-[70vh] bg-gray ">
            {otherUserId && <Rating otherUserId={otherUserId} />}            <div ref={chatContainerRef} className="flex flex-col flex-grow overflow-auto mb-4 p-5">
                {messages.map((message) => {
                    const author = isAuthor(message);
                    return author ? (
                        <span key={message._id} className='self-end bg-[#DCF1DE] rounded-l-md rounded-t-md py-1 px-3 mb-2'>
                            {message.text}
                        </span>
                    ) : (
                        <span key={message._id} className='self-start bg-[#D9D9D9] rounded-r-md rounded-t-md py-1 px-3 mb-2'>
                            {message.text}
                        </span>
                    );
                })}
            </div>
            <div className="sticky bottom-0 w-full">
                <SendMessage chatroomId={chatroomId} />
            </div>
        </div>
    )

}




export default Chat