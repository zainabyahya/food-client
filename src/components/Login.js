import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import Curve from './Curve';

const Login = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleLogin = () => {
    //     dispatch(loginUser({ number, password }));
    //     navigate("/");
    // };

    return (
        <div className="relative h-[91vh] p-10 lg:p-0 md:w-3/5 lg:w-full m-auto lg:flex overflow-hidden">
            <div className='lg:w-2/3 lg:h-full lg:bg-primary flex items-center justify-center relative -z-20'>
                <form className="flex flex-col gap-10 lg:justify-center items-center p-5 pt-10 lg:w-2/3 xl:w-1/3 lg:m-auto z-10">
                    <div className="flex flex-col w-full">
                        <label className="self-end p-1" htmlFor="number">
                            رقم الهاتف
                        </label>
                        <input
                            className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                            id="number"
                            type="text"
                            placeholder="رقم الهاتف"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="self-end p-1" htmlFor="password">
                            كلمة السر
                        </label>
                        <input
                            className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                            id="password"
                            type="password"
                            placeholder="كلمة السر"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="bg-secondary text-white w-full rounded-lg p-2 mx-5">
                        <button
                            className="w-full"
                            type="button"
                        // onClick={handleLogin}
                        >
                            تسجيل دخول
                        </button>
                    </div>
                    <div className='m-5'>لا تمتلك حساب؟
                        <Link to="/signup" className="px-2 text-white hover:underline">
                            أنشئ حسابًا
                        </Link>
                    </div>
                </form>
                <div className='absolute top-0 left-0 w-full h-full -z-10'>
                    <div className='hidden lg:block absolute -bottom-64 -left-64 h-auto w-[150%]'>
                        <Curve color={"#F7F7F7"} opacity={0.5} />
                    </div>
                    <div className='hidden lg:block absolute -top-64 -right-[70rem] h-auto w-[150%] rotate-180'>
                        <Curve color={"#F7F7F7"} opacity={1} />
                    </div>
                    <div className='lg:hidden absolute  h-auto w-[50%] -bottom-96 -left-96'>
                        <Curve color={'#1EA896'} opacity={0.9} />
                    </div>
                </div>
            </div>
            <div className='hidden lg:flex lg:w-1/3 h-screen items-center justify-center relative'>
                <h1 className='font-[vibes] text-secondary text-7xl p-5 text-center'>مستعد لحفظ بعض الطعام؟</h1>
            </div>

        </div>
    );
};

export default Login;
