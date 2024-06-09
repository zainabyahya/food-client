import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray h-[15rem] w-full'>
            <div className='m-auto h-full w-4/5 flex flex-row-reverse justify-between items-center'>
                <div className='flex flex-col justify-center items-end'>
                    <span className='font-[vibes] text-xl'>بالعافية</span>
                    <span className=' text-sm'>حقوق النشر @ ٢٠٢٤</span>
                </div>
                <div>
                    <span className='cursor-pointer'>من نحن؟</span>
                </div>

            </div>
        </div>
    )
}

export default Footer