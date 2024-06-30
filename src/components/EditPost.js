import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlogPost, getBlogPostById } from '../slices/blogSlice';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import { Oval } from 'react-loader-spinner';
import 'react-quill/dist/quill.snow.css';

Modal.setAppElement('#root');

const EditPost = ({ isOpen, onRequestClose, post }) => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    useEffect(() => {
        setTitle(post.title);
        setContent(post.content);
    }, [dispatch, postId, post]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedPost = { ...post, title, content };
        console.log("🚀 ~ handleSubmit ~ updatedPost:", updatedPost)
        try {
            await dispatch(updateBlogPost(updatedPost));
            onRequestClose();

        } catch (error) {
            console.error("Error updating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="تعديل المنشور"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex flex-row-reverse justify-between items-center mb-3">
                    <h1 className='font-bold'>تعديل المنشور</h1>
                    <button onClick={onRequestClose}>
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

                        <div className="w-full">

                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='bg-gray py-2 px-2 rounded-md w-full'
                                placeholder='اسم الطبق'
                            />
                        </div>
                        <div className="w-full h-[20rem] bg-gray">
                            <ReactQuill
                                value={content}
                                onChange={(value) => setContent(value)}
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
                        </div>
                        <button type='submit' className='bg-secondary text-white p-3 rounded-md m-auto' disabled={loading}>
                            {loading ? 'جاري التحديث...' : 'تحديث المنشور'}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default EditPost;
