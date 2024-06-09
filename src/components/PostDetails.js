import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import image from '../assets/k.jpeg';
import { FaRegCommentAlt, FaHeart, FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import AddComment from './AddComment';

const PostDetails = () => {
    return (
        <div className='bg-primary'>
            <div className=' pb-10 px-10 lg:px-20 flex flex-col items-end lg:w-4/5 m-auto'>
                <div className='flex flex-row-reverse justify-center items-center text-white text-2xl gap-3 py-5'>
                    <BsArrowRight />
                    <span className='cursor-pointer' >العودة</span>
                </div>
                <div className='flex flex-col items-end gap-5 bg-white w-full min-h-[80vh] p-10 lg:p-20 rounded-lg'>
                    <div className='flex flex-row-reverse justify-center items-center gap-2'>
                        <img src={image} alt='profile' className='w-[3rem] h-[3rem]  rounded-full' />
                        <span className='text-xl'>زينب ليث</span>
                    </div>
                    <img src={image} alt="post" className='rounded-md w-full h-auto object-cover overflow-hidden' />
                    <div className='flex flex-col justify-center items-end'>
                        <h1 className='text-bold text-2xl text-end'> ما هي الطرق التي يمكن بها استخدام قشر الموز بدلًا من رميه؟</h1>
                        <p className='text-end'>
                            البستنة:
                            سماد طبيعي: يمكن وضع قشور الموز في التربة أو إضافتها إلى كومة السماد لزيادة محتوى التربة من البوتاسيوم والمغذيات الأخرى.
                            جذب الطيور: قطع قشور الموز إلى قطع صغيرة ووضعها في الحديقة لجذب الطيور.
                            طرد الحشرات: يمكن وضع قطع صغيرة من قشور الموز حول النباتات لردع بعض الحشرات والآفات.
                            العناية المنزلية:
                            تلميع الفضيات والأحذية الجلدية: يمكن فرك الجزء الداخلي من قشرة الموز على الفضيات أو الأحذية الجلدية لتلميعها.
                            تنظيف أوراق النباتات: فرك أوراق النباتات المنزلية بالجزء الداخلي من قشرة الموز لتنظيفها وتلميعها.
                            الاستخدامات الغذائية:
                            تحضير شاي قشر الموز: غلي قشور الموز في الماء لتحضير شاي مهدئ وغني بالمغذيات.
                            إضافتها إلى العصائر: يمكن إضافة قشر الموز إلى العصائر بعد غسله جيدًا وخلطه بشكل جيد للحصول على فوائد إضافية من الألياف والمغذيات.
                            العناية بالحيوانات الأليفة:
                            تغذية الحيوانات: بعض الحيوانات مثل الأرانب والدواجن قد تستفيد من تناول قشور الموز كجزء من نظامهم الغذائي.

                            بهذه الطرق، يمكن استغلال قشور الموز بشكل فعّال وصديق للبيئة بدلًا من رميها.

                        </p>

                    </div>
                    <div className='self-start flex justify-center items-center gap-2'>
                        <span>٧ اعجاب</span>
                        <FaRegHeart className='cursor-pointer' />
                        <FaRegBookmark className='cursor-pointer' />
                    </div>
                    <div className='w-full flex flex-col items-end justify-center gap-3'>
                        <span className='font-bold'>التعليقات</span>
                        <hr className=' w-full border-[1px] border-darkGray' />
                        <span className='font-bold'>نور محمد</span>
                        <span>عظيم! طرائق مبتكرة</span>
                        <hr />
                    </div>
                    <AddComment />
                </div>
            </div >
        </div>
    )
}

export default PostDetails