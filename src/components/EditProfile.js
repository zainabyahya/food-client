import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { updateUser, getUserById } from '../slices/userSlice';
import { Oval } from 'react-loader-spinner';

Modal.setAppElement('#root');

const EditProfile = ({ isOpen, onRequestClose, user }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [image, setImage] = useState(user.image);
    const [loading, setLoading] = useState(false);
    const [imageAdded, setImageAdded] = useState(!!user.image);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhoneNumber(user.phoneNumber);
        setImage(user.image);
        setImageAdded(user.image);
    }, [user]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageAdded(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedUser = {
            ...user,
            firstName,
            lastName,
            phoneNumber,
            image,
        };
        console.log("🚀 ~ handleSubmit ~ updatedUser:", updatedUser)

        try {
            await dispatch(updateUser(updatedUser));
            onRequestClose();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => { if (!loading) onRequestClose(); }}
            contentLabel="Edit User Information"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>تعديل المعلومات الشخصية
                    </h1>
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
                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-end gap-3'>
                        <label className='w-full bg-gray py-2 px-2 rounded-md text-center cursor-pointer'>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {imageAdded ? "تم اضافة الصورة" : "حدث الصورة"}
                        </label>

                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <input
                            className='w-full bg-gray py-2 px-2 rounded-md'
                            type='text'
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                        <button type='submit' className='bg-secondary text-white p-3 rounded-md w-full' disabled={loading}>
                            {loading ? 'جارِ التحديث' : 'تحديث معلومات المستخدم'}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default EditProfile;
