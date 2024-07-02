import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFoodPost } from '../slices/foodSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import useUserLocation from '../hooks/useUserLocation';
import { Oval } from 'react-loader-spinner';

Modal.setAppElement('#root');

const EditFood = ({ isOpen, onRequestClose, foodPost }) => {
    const dispatch = useDispatch();
    const { userLocation, getUserLocation } = useUserLocation();
    const [title, setTitle] = useState(foodPost.title);
    const [notes, setNotes] = useState(foodPost.notes);
    const [time, setTime] = useState(foodPost.time);
    const [image, setImage] = useState(foodPost.image);
    const [location, setLocation] = useState(foodPost.location);
    const [loading, setLoading] = useState(false);
    const [imageAdded, setImageAdded] = useState(foodPost.image);
    const [locationAdded, setLocationAdded] = useState(foodPost.location);

    useEffect(() => {
        setTitle(foodPost.title);
        setNotes(foodPost.notes);
        setTime(foodPost.time);
        setImage(foodPost.image);
        setLocation(foodPost.location);
        setImageAdded(!!foodPost.image);
        setLocationAdded(!!foodPost.location);
    }, [dispatch, foodPost]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageAdded(true);
    };

    const handleGetLocation = () => {
        getUserLocation();
        if (userLocation) {
            setLocation(userLocation);
            setLocationAdded(true);
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedPost = {
            ...foodPost,
            title,
            notes,
            time,
            image,
            location
        };

        try {
            await dispatch(updateFoodPost(updatedPost));
            onRequestClose();
        } catch (error) {
            console.error("Error updating food post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                if (!loading) onRequestClose();
            }}
            contentLabel="تعديل التبرع بالطعام"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>تعديل التبرع بالطعام</h1>
                    <button onClick={() => { if (!loading) onRequestClose(); }}>
                        <IoClose className="text-2xl cursor-pointer" />
                    </button>
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
                        <label className='w-full bg-gray py-2 px-2 rounded-md text-center cursor-pointer'>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {imageAdded ? "تم إضافة الصورة" : "صورة الطبق"}
                        </label>

                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='العنوان'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='الملاحظات'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                        />
                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            placeholder='الوقت'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                        <span className={`w-full bg-gray p-2 rounded-md text-center`} onClick={handleGetLocation}>
                            {locationAdded ? "تم تحديد الموقع" : "حدد موقعك"}
                        </span>
                        <button type='submit' className='bg-secondary text-white p-3 rounded-md w-full' disabled={loading}>
                            {loading ? 'جاري التحديث...' : 'تحديث التبرع بالطعام'}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default EditFood;
