import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import Chat from '../components/Chat';
import ChatList from '../components/ChatList';
import useWindowSize from '../hooks/useWindowSize';

const ChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderInfo = location.state || {};
    const { width } = useWindowSize();

    const handleNavigate = () => {
        navigate("/");
    }

    return (
        <div className='bg-primary'>
            <div className='pb-10 px-10 lg:px-20 flex flex-col items-end lg:w-4/5 m-auto'>
                <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5' onClick={handleNavigate}>
                    <BsArrowRight />
                    <span className='cursor-pointer'>العودة</span>
                </div>
                <div className='w-full min-h-[70vh] bg-white rounded-md'>
                    {width > 768 ? (
                        <div className="flex flex-row-reverse">
                            <div className="w-1/3">
                                <ChatList />
                            </div>
                            <div className="w-2/3">
                                <Routes>
                                    <Route path=":chatroomId" element={<Chat />} />
                                </Routes>
                            </div>
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={<ChatList />} />
                            <Route path=":chatroomId" element={<Chat />} />
                        </Routes>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
