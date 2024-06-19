import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../slices/messageSlice';
import { selectUser } from '../slices/authSlice';

const SendMessage = ({ chatroomId }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const currentToken = useSelector(selectUser)

    const handleMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newMessage = {
            text: text,
            chatroom: chatroomId
        };

        dispatch(addMessage(newMessage));

        setText('');
    };

    return (
        <form onSubmit={(e) => handleMessage(e)} className='w-full flex flex-row-reverse justify-center  items-center gap-2 bg-white p-2'>
            <input
                className='bg-gray  p-2 w-10/12 rounded-md'
                type='text'
                placeholder='اكتب هنا'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className=' text-secondary font-bold py-2 px-1 w-2/12 rounded-md' >
                ارسل
            </button>
        </form>
    )
}

export default SendMessage