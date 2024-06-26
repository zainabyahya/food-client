import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import AddFood from './AddFood';
import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };
    return (
        <div>
            <div className='w-full h-[5rem] text-3xl bg-primary text-white lg:hidden flex flex-row-reverse justify-between items-center'>
                <span className='font-[vibes] p-5 '>بالعافية</span>
                <button className="p-5 text-white" onClick={() => { setDropdown(!dropdown) }} >
                    <BsList />
                </button>
            </div>
            <div className={`bg-primary text-white flex-col items-center border-b-[1px] lg:hidden -z-10 ${!dropdown ? "hidden" : "flex"}`} id="navbar-hamburger">
                {
                    [
                        ['1', 'المجتمع', '/community'],
                        ['2', 'الرسائل', '/chats'],
                        ['6', 'تبرع بالطعام', '/donate'],
                        ['5', 'صفحتي', `/profile/${user?.userId}`],
                        ['3', ' المفضلة', '/bookmarks'],
                        ['7', 'تسجيل الخروج', '/logout'],
                    ].map(([id, title, url]) => {
                        if (!user) {
                            if (id === "2" || id === "5" || id === "3" || id === "7") {
                                return
                            }
                            else if (id === "6") {
                                return <span key={id} onClick={() => { navigate("/auth") }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>

                            } else {
                                return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                            }
                        } else {
                            if (id === "6") {
                                return <span key={id} onClick={handleOpenModal} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                            } else {
                                return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                            }
                        }
                    })
                }
                <AddFood isOpen={isModalOpen} onRequestClose={handleCloseModal} />

            </div>
            <div className='hidden lg:block w-full l bg-primary'>
                <div className='m-auto w-4/5 flex h-[5rem] text-xl text-white flex-row-reverse justify-center items-end gap-10'>
                    {
                        [
                            ['2', 'الرسائل', '/chats'],
                            ['3', ' المفضلة', '/bookmarks'],
                            ['6', 'تبرع بالطعام', '/donate'],
                            ['4', 'بالعافية', '/'],
                            ['1', 'المجتمع', '/community'],
                            ['5', 'صفحتي', `/profile/${user?.userId}`],
                            ['7', 'تسجيل الخروج', '/logout'],
                        ].map(([id, title, url]) => {
                            if (id === "4") {
                                return <span key={id} className='font-[vibes] p-5 text-4xl lg:text-5xl cursor-pointer w-fit' onClick={() => { navigate(url) }}>بالعافية</span>
                            }
                            if (!user) {
                                if (id === "2" || id === "5" || id === "3" || id === "7") {
                                    return
                                }
                                else if (id === "6") {
                                    return <span key={id} onClick={() => { navigate("/auth") }} className="p-5 hover:underline text-lg lg:text-xl cursor-pointer ">{title}</span>
                                } else {
                                    return <span key={id} onClick={() => { navigate(url) }} className=" p-5 hover:underline text-lg lg:text-xl cursor-pointer ">{title}</span>

                                }
                            } else {
                                if (id === "6") {
                                    return <span key={id} onClick={handleOpenModal} className=" p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                                } else if (id === "7") {
                                    return <span key={id} onClick={logoutHandler} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                                }
                                else {
                                    return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-lg lg:text-xl cursor-pointer ">{title}</span>
                                }
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar