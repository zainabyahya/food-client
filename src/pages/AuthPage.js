import React from 'react'
import image from '../2.png';
import { ReactComponent as Curve } from '../assets/curve-vector.svg';


const authPage = () => {
    return (
        <div className='relative flex justify-center items-center h-[90vh] overflow-hidden'>
            <div className='w-4/5 p-10 flex flex-col justify-center items-center gap-10'>
                <div className='p-10  flex flex-col justify-center items-between gap-10'>
                    <div className='font-bold  text-3xl md:text-4xl text-primary text-center self-end'>بلغت كمية الطعام المهدور  في العراق في سنة ٢٠٢٣ ستة مليون طن </div>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className='hidden md:block self-end'>
                            <img className='w-full h-auto' src={image} alt='auth' />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-10 md:justify-end md:gap-40'>
                            <div className='text-xl md:text-3xl text-primary text-center'>
                                <span className='w-4/5 font-[vibes]'>بالعافية</span> منصة لتبادل الطعام بين الأفراد وتقليل الطعام المهدور
                            </div>
                            <div className='text-white w-full flex justify-center md:justify-end gap-5'>
                                <button className=' text-white rounded-md p-3 bg-secondary md:w-[40%]'>تسجيل دخول</button>
                                <button className=' text-white rounded-md p-3 bg-secondary md:w-[40%]'>انشاء حساب</button>
                            </div>
                        </div>
                        <div className='md:hidden mt-10'>
                            <img className='w-full h-auto' src={image} alt='auth' />
                        </div>
                        <Curve className='hidden md:block absolute  -bottom-40 -left-64 w-2/3 lg:w-1/2 h-auto -z-10 overflow-y-hidden' />
                        <Curve className='hidden md:block absolute rotate-180 -top-40 -right-64 w-2/3 lg:w-1/2 h-auto -z-10 overflow-y-hidden' />
                        <Curve className='md:hidden absolute  w-[200%] -rotate-45 -bottom-52 -left-64 h-auto -z-10 overflow-y-hidden' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default authPage