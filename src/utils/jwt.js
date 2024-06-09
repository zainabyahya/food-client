import { jwtDecode } from "jwt-decode";

function decodeJWT(token) {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem('token', token);
            return null;
        }
        return decodedToken;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
}

export default decodeJWT;