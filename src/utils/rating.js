function getAverageRating(sum, count) {
    if (sum === 0 || count === 0)
        return 0;
    return (sum / count).toFixed(2)
}

export default getAverageRating;