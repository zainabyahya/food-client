import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateUserRating } from '../slices/userSlice';

const StarRating = ({ otherUserId }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const dispatch = useDispatch();
    const handleClick = (value) => {
        setRating(value);
        dispatch(updateUserRating({ id: otherUserId, rating: value }));
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            style={{ display: 'none' }}
                            onClick={() => handleClick(ratingValue)}
                        />
                        <FaStar
                            size={30}
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            style={{
                                cursor: 'pointer',
                                transition: 'color 200ms',
                            }}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
