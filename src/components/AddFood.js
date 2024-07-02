import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodPost } from '../slices/foodSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import useUserLocation from '../hooks/useUserLocation';
import { Oval } from 'react-loader-spinner'
Modal.setAppElement('#root');

const AddFood = ({ isOpen, onRequestClose }) => {
    const { userLocation, getUserLocation, isLoading } = useUserLocation();
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        time: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [imageAdded, setImageAdded] = useState(false);
    const [locationAdded, setLocationAdded] = useState(false);
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
        setImageAdded(true);
    };


    const handleGetLocation = () => {
        getUserLocation();
        if (userLocation) {
            setLocationAdded(true);
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('notes', formData.notes);
        data.append('time', formData.time);
        data.append('image', formData.image);
        data.append('location', JSON.stringify(userLocation));
        data.append('dateCreated', new Date());
        console.log("🚀 ~ AddFood ~ formData:", formData)


        try {

            await dispatch(addFoodPost(data));
            setFormData({
                title: '',
                notes: '',
                time: '',
                image: null
            });

            setImageAdded(false);
            setLocationAdded(false);
            onRequestClose();
        } catch (error) {
            console.error("Error adding food post:", error);
        } finally {
            setLoading(false);
        }
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
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#FF715B"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            secondaryColor="#1EA896"
                        />
                    </div>
                ) : (
                    <form onSubmit={handlePost} className='w-full flex flex-col items-end gap-3'>
                        <label
                            className='w-full bg-gray py-2 px-2 rounded-md text-center cursor-pointer'
                        >
                            <input
                                className='w-full bg-gray py-2 px-2 rounded-md '
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                required
                                class="custom-file-upload"

                            />
                            {imageAdded ? "تم إضافة الصورة" : "صورة الطبق"}
                        </label>

                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='اسم الطبق'
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
                        <span className={`w-full bg-gray p-2 rounded-md text-center cursor-pointer`} onClick={handleGetLocation} value={userLocation}>
                            {locationAdded ? "تم تحديد الموقع" : "حدد موقعك"}
                        </span>

                        <button disabled={isLoading} type='submit' className={`${isLoading ? "bg-gray text-[#000]" : "bg-secondary  text-white"} p-3 rounded-md w-full`} >
                            تبرع بالطعام
                        </button>
                    </form>
                )}
            </div>
        </Modal >
    );
};

export default AddFood;
