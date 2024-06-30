import { useState, useEffect } from 'react';

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const getUserLocation = () => {
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            setLoading(true);

            // get the current user's location
            navigator.geolocation.getCurrentPosition(

                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    // update the value of userLocation variable
                    setUserLocation({ latitude, longitude });
                    setLoading(false);
                },
                // if there was an error getting the user's location
                (error) => {
                    setError(error);
                    console.error('Error getting user location:', error);
                    setLoading(false);

                }
            );
        } else {
            const unsupportedError = new Error('Geolocation is not supported by this browser.');
            setError(unsupportedError);
            console.error(unsupportedError);
        }
    };

    return { userLocation, getUserLocation, error, isLoading };
};

export default useUserLocation;
