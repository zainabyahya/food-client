import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodPost } from '../slices/foodSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import useUserLocation from '../hooks/useUserLocation';

Modal.setAppElement('#root');

const AddFood = ({ isOpen, onRequestClose }) => {
    const { userLocation, getUserLocation, error } = useUserLocation();
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        time: '',
        image: null
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0]
        }));
    };

    const handlePost = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('notes', formData.notes);
        data.append('time', formData.time);
        data.append('image', formData.image);
        data.append('location', JSON.stringify(userLocation));
        data.append('dateCreated', new Date());

        dispatch(addFoodPost(data))
            .then(() => {
                setFormData({
                    title: '',
                    notes: '',
                    time: '',
                    image: null
                });
            });
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="تبرع بالطعام"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>تبرع بالطعام</h1>
                    <button onClick={onRequestClose}><IoClose className="text-2xl cursor-pointer" /></button>
                </div>
                <form onSubmit={handlePost} className='w-full flex flex-col items-end gap-3'>
                    <input
                        className='w-full bg-gray py-2 px-2 rounded-md'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        required
                    />
                    <input
                        className='w-full bg-gray py-2 px-2 rounded-md'
                        type='text'
                        placeholder='العنوان'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full bg-gray py-2 px-2 rounded-md'
                        type='text'
                        placeholder='الملاحظات'
                        name='notes'
                        value={formData.notes}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full bg-gray py-2 px-2 rounded-md'
                        placeholder='الوقت'
                        name='time'
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                    <span className={`w-full bg-gray p-2 rounded-md text-center`} onClick={getUserLocation} value={userLocation}>
                        حدد موقعك
                    </span>
                    <button type='submit' className='bg-secondary text-white p-3 rounded-md w-full'>
                        تبرع بالطعام
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddFood;
