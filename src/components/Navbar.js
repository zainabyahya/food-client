import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";


const Navbar = ({ user }) => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    return (
        <div>
            <div className='w-full h-[5rem] text-3xl bg-primary text-white md:hidden flex flex-row-reverse justify-between items-center'>
                <span className='font-[vibes] p-5 '>بالعافية</span>
                <button className="p-5 text-white" onClick={() => { setDropdown(!dropdown) }} >
                    <BsList />
                </button>
            </div>
            <div className={`bg-primary text-white flex-col items-center border-b-[1px] md:hidden -z-10 ${!dropdown ? "hidden" : "flex"}`} id="navbar-hamburger">
                {
                    [
                        ['1', 'المجتمع', '/community'],
                        ['2', 'الرسائل', '/messages'],
                        ['3', 'صفحتي', '/profile'],
                        ['4', 'تبرع بالطعام', '/donate'],
                    ].map(([id, title, url]) => {
                        if (!user) {
                            if (id === "2" || id === "3") {
                                return
                            }
                            else if (id === "4") {
                                return <span key={id} onClick={() => { navigate("/register") }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>

                            } else {
                                return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                            }

                        }
                        <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-xl cursor-pointer ">{title}</span>
                    })
                }
            </div>
            <div className='hidden md:block w-full l bg-primary'>
                <div className='m-auto w-3/5 flex h-[5rem] text-xl text-white flex-row-reverse justify-between items-end '>
                    {
                        [
                            ['1', 'المجتمع', '/community'],
                            ['2', 'الرسائل', '/messages'],
                            ['3', 'بالعافية', '/'],
                            ['4', 'صفحتي', '/profile'],
                            ['5', 'تبرع بالطعام', '/donate'],
                        ].map(([id, title, url]) => {
                            if (id === "3") {
                                return <span key={id} className='font-[vibes] p-5 text-4xl lg:text-5xl cursor-pointer '>بالعافية</span>
                            }
                            if (!user) {
                                if (id === "2" || id === "4") {
                                    return
                                }
                                else if (id === "5") {
                                    return <span key={id} onClick={() => { navigate("/register") }} className="p-5 hover:underline text-lg lg:text-xl cursor-pointer ">{title}</span>
                                }
                            }
                            return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline text-lg lg:text-xl cursor-pointer ">{title}</span>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar