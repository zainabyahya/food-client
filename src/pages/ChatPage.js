import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';
import SendMessage from '../components/SendMessage';

const ChatPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate("/")
    }
    return (
        <div className='bg-primary'>
            <div className=' pb-10 px-10 lg:px-20 flex flex-col items-end lg:w-4/5 m-auto'>
                <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5' onClick={(e) => handleNavigate()} >
                    <BsArrowRight />
                    <span className='cursor-pointer' >العودة</span>
                </div>
                <div className='w-full bg-white rounded-md p-10'>

                </div>
            </div>
        </div >
    )
}

export default ChatPage;