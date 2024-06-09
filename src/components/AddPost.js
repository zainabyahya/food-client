import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addPost } from '../actions/postActions';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root');

const AddPost = ({ isOpen, onRequestClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const handlePost = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', content);
        // formData.append('image', image);
        // formData.append('dateCreated', new Date());
        // dispatch(addPost(formData));
        // onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="اضافة منشور"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5 '>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>اضافة منشور</h1>
                    <button onClick={onRequestClose}><IoClose className="text-2xl cursor-pointer" /></button>
                </div>
                <form onSubmit={handlePost} className='w-full flex flex-col items-end gap-3'>
                    <input
                        className=' bg-gray py-2 px-2 rounded-md'
                        type='text'
                        placeholder='العنوان'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        className=' bg-gray py-2 px-2 rounded-md'
                        placeholder='المحتوى'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ height: '200px' }}
                        required
                    />
                    <input
                        className=' bg-gray py-2 px-2 rounded-md'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />

                    <button type='submit' className='bg-secondary text-white p-3 rounded-md '>
                        اضافة منشور
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddPost;
