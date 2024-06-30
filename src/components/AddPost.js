import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBlogPost } from '../slices/blogSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import { Oval } from 'react-loader-spinner';
import 'react-quill/dist/quill.snow.css';

Modal.setAppElement('#root');

const AddPost = ({ isOpen, onRequestClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: '',
        content: '',
        image: null
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('العنوان مطلوب'),
        content: Yup.string().required('المحتوى مطلوب'),
        image: Yup.mixed()
    });

    const handlePost = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        if (values.image) {
            formData.append('image', values.image);
        }

        try {
            await dispatch(addBlogPost(formData));
            resetForm();
            onRequestClose();
        } catch (error) {
            console.error("Error adding post:", error);
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
            contentLabel="اضافة منشور"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>اضافة منشور</h1>
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handlePost}
                    >
                        {({ setFieldValue, values, isSubmitting }) => (
                            <Form className='w-full flex flex-col items-end gap-3'>
                                <div className="w-full">
                                    <Field
                                        className='bg-gray py-2 px-2 rounded-md w-full'
                                        type='text'
                                        name='title'
                                        placeholder='العنوان'
                                    />
                                    <ErrorMessage name='title' component='div' className='text-red-500' />
                                </div>

                                <div className="w-full h-[20rem] bg-gray">
                                    <ReactQuill
                                        value={values.content}
                                        onChange={(value) => setFieldValue('content', value)}
                                        className='bg-gray py-2 px-2 rounded-md w-full h-[15rem]'
                                        placeholder='المحتوى'
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                        formats={[
                                            'header', 'font', 'size',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet', 'indent',
                                            'link', 'image', 'video'
                                        ]}
                                    />
                                    <ErrorMessage name='content' component='div' className='text-red-500' />
                                </div>

                                <label className='w-full bg-gray py-2 px-2 rounded-md text-center cursor-pointer'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        className="hidden"
                                        onChange={(event) => {
                                            setFieldValue('image', event.currentTarget.files[0]);
                                        }}
                                    />
                                    اضافة صورة
                                </label>
                                <ErrorMessage name='image' component='div' className='text-red-500' />

                                <button type='submit' className='bg-secondary text-white p-3 rounded-md m-auto' disabled={isSubmitting || loading}>
                                    {loading ? 'جاري الإضافة...' : 'اضافة منشور'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </Modal>
    );
};

export default AddPost;
