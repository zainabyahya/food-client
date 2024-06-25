import React from 'react'
import heroImg from "../assets/chick-nobg.png"
import Curve from './Curve'

const HeroSection = () => {
    return (
        <div className=' bg-primary h-[55vh] lg:h-[70vh] relative overflow-hidden -z-20 '>
            <div className='flex flex-row-reverse justify-evenly items-center h-full'>
                <div className='w-1/2 hidden lg:block'>
                    <img src={heroImg} alt='hero' className=' h-auto' />
                </div>
                <div className='w-full lg:w-1/2 flex  justify-center lg:justify-end'>
                    <h1 className='p-10 w-2/3 text-center lg:text-center text-6xl text-white font-bold'>لا تكن رقمًا اضافيًا في اهدار الطعام</h1>
                </div>
            </div>
            <div className='hidden lg:block absolute -left-96 -bottom-56 h-auto w-[150%]'>
                <Curve color={"#F7F7F7"} opacity={0.5} />
            </div>
            <div className='hidden lg:block absolute -right-96 -top-56 h-auto w-[150%] rotate-180 -z-10'>
                <Curve color={"#F7F7F7"} opacity={0.5} />
            </div>
            <div className='lg:hidden absolute  h-auto w-[50%] -bottom-96 -left-96 -z-10'>
                <Curve color={'#f7f7f7'} opacity={0.5} />
            </div>
        </div>
    )
}

export default HeroSection;