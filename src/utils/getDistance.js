export const toRadian = (degree) => {
    return degree * Math.PI / 180;
};

export const getDistance = (origin, destination) => {
    console.log("i am hereeeeee");
    const lon1 = toRadian(origin.longitude),
        lat1 = toRadian(origin.latitude),
        lon2 = toRadian(destination.longitude),
        lat2 = toRadian(destination.latitude);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const EARTH_RADIUS = 6371;
    return (c * EARTH_RADIUS).toFixed(1);
};
