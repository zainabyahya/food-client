import React from 'react'

const AddComment = () => {
    return (
        <div className='w-full flex flex-row-reverse justify-center  items-center gap-2'>
            <input type='text' placeholder='علق هنا' className='w-4/5 p-2 bg-gray text-darkGray rounded-md' />
            <button className='bg-secondary text-white py-2 px-1 w-1/5 rounded-md'> علق</button>
        </div>
    )
}

export default AddComment