import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl mb-8">الصفحة غير موجودة</p>
            <Link to="/" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                اذهب الى الصفحة الرئيسية
            </Link>
        </div>
    );
};

export default NotFound;
