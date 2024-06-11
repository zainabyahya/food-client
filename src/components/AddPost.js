import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBlogPost } from '../slices/blogSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Modal.setAppElement('#root');

const AddPost = ({ isOpen, onRequestClose }) => {
    const dispatch = useDispatch();

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

    const handlePost = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        if (values.image) {
            formData.append('image', values.image);
        }
        console.log("🚀 ~ handlePost ~ formData:", formData)

        dispatch(addBlogPost(formData)).then(() => {
            setSubmitting(false);
            resetForm();
            onRequestClose();
        });
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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handlePost}
                >
                    {({ setFieldValue, values }) => (
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

                            <div className="w-full">
                                <ReactQuill
                                    value={values.content}
                                    onChange={(value) => setFieldValue('content', value)}
                                    className='bg-gray py-2 px-2 rounded-md w-full'
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

                            <div className="w-full">
                                <input
                                    className='bg-gray py-2 px-2 rounded-md w-full'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => setFieldValue('image', e.target.files[0])}
                                />
                                <ErrorMessage name='image' component='div' className='text-red-500' />
                            </div>

                            <button type='submit' className='bg-secondary text-white p-3 rounded-md m-auto'>
                                اضافة منشور
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default AddPost;
