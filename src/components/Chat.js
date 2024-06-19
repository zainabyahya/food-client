import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../slices/authSlice'
import { getMessagesByChatroom } from '../slices/messageSlice'
import { getConfirmationByPostId } from '../slices/confirmationSlice';
import { useParams } from 'react-router-dom';
import SendMessage from '../components/SendMessage';

const Chat = () => {
    const { chatroomId } = useParams();
    console.log("🚀 ~ Chat ~ chatroomId:", chatroomId)
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages);
    console.log("🚀 ~ Chat ~ messages:", messages)
    const currentUser = useSelector(selectUser);
    // const { confirmation } = useSelector((state) => state.confirmation);

    const isAuthor = (message) => {
        return message.user === currentUser.userId;
    }
    useEffect(() => {
        dispatch(getMessagesByChatroom(chatroomId));
        // dispatch(getConfirmationByPostId(confirmation._id))
    }, [dispatch, chatroomId]);

    return (
        <div className="flex flex-col min-h-[70vh] bg-gray ">
            <div className="flex flex-col flex-grow overflow-auto mb-4 p-5">
                {messages.map((message) => {
                    const author = isAuthor(message);
                    console.log("🚀 ~ {messages.map ~ author:", author)
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