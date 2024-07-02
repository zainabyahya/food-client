import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../slices/authSlice';
import Curve from './Curve';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    console.log("🚀 ~ Signup ~ error:", error)
    const [imageAdded, setImageAdded] = useState(false);

    return (
        <div className=" h-[91vh] p-10 lg:p-0 md:w-3/5 lg:w-full m-auto lg:flex overflow-hidden">
            <div className='lg:w-2/3 lg:h-full lg:bg-primary flex items-center relative'>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                        image: null,
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('الاسم الاول مطلوب'),
                        lastName: Yup.string().required('اسم العائلة مطلوب'),
                        phoneNumber: Yup.string().required('رقم الهاتف مطلوب'),
                        password: Yup.string().required('كلمة السر مطلوبة'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], "كلمتا السر غير متطابقتان")
                            .required('تأكيد كلمة السر مطلوب'),
                        image: Yup.mixed().test('fileSize', 'The file is too large', (value) => {
                            return value && value.size <= 1024 * 1024;
                        })
                            .test('fileFormat', 'Unsupported Format', (value) => {
                                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
                            }),

                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("Form values:", values);
                        const formData = new FormData();
                        formData.append('firstName', values.firstName);
                        formData.append('lastName', values.lastName);
                        formData.append('phoneNumber', values.phoneNumber);
                        formData.append('password', values.password);
                        formData.append('image', values.image);

                        dispatch(signup(formData))
                            .then(() => {
                                navigate('/');
                            })
                            .catch((error) => {
                                console.error("Signup error:", error);
                            })
                            .finally(() => {
                                setSubmitting(false);
                                setImageAdded(false);
                            });
                    }}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="flex flex-col gap-5 lg:justify-center items-center p-5 pt-10 lg:w-2/3 xl:w-1/3 lg:m-auto absulote z-20">
                            <div className='flex flex-row-reverse justify-center items-center w-full gap-2'>
                                <div className="flex flex-col w-1/2">
                                    <Field
                                        className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="الاسم الاول"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <Field
                                        className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="اسم العائلة"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <Field
                                    className="drop-shadow-lg rounded-lg bg-white w-full p-3 "
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="رقم الهاتف"
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                            </div>
                            <div className="flex flex-col w-full">
                                <Field
                                    className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="كلمة السر"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <div className="flex flex-col w-full">
                                <Field
                                    className="drop-shadow-lg rounded-lg bg-white w-full p-3"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="اعد كتابة كلمة السر"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="image" className='drop-shadow-lg rounded-lg bg-white w-full p-3 cursor-pointer h-[2.5rem] text-center'>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setFieldValue("image", event.currentTarget.files[0]);
                                            setImageAdded(true);
                                        }}
                                    />
                                    {imageAdded ? "تم إضافة الصورة" : "الصورة الشخصية"}
                                </label>
                            </div>
                            <div className="bg-secondary text-white w-full rounded-lg p-2 mx-5">
                                <button
                                    className="w-full"
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                >
                                    انشئ حسابًا
                                </button>
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div className='m-5'> تمتلك حساب بالفعل؟
                                <Link to="/login" className="px-2  text-secondary lg:text-white hover:underline cursor-pointer">
                                    سجل دخولك
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='absolute top-0 left-0 w-full h-full z-10'>
                    <div className='hidden lg:block absolute -bottom-64 -left-64 h-auto w-[150%]'>
                        <Curve color={"#F7F7F7"} opacity={0.5} />
                    </div>
                    <div className='hidden lg:block absolute -top-64 -right-[70rem] h-auto w-[150%] rotate-180'>
                        <Curve color={"#F7F7F7"} opacity={1} />
                    </div>
                    <div className='lg:hidden absolute  h-auto w-[50%] -bottom-80 -left-96'>
                        <Curve color={'#1EA896'} opacity={0.9} />
                    </div>
                </div>
            </div >
            <div className='hidden lg:flex lg:w-1/3 h-screen items-center justify-center relative'>
                <h1 className='font-[vibes] text-secondary text-7xl p-5 text-center'>مستعد لحفظ بعض الطعام؟</h1>
            </div>
        </div >
    );
};

export default Signup;
