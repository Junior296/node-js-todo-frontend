import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'http://localhost:5000/api/auth';

const token = localStorage.getItem('token');

const register = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/register`, formData)
        toast.success(res.data.message);
        window.location.href = '/login';

    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || 'Registration Failed';

        toast.error(errorMessage);
    }
};

const login = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}/login`, formData);
        toast.success(res.data.message); 
        localStorage.setItem('token', res.data.token);

        window.location.href = '/';
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Login Failed';
        toast.error(errorMessage);
    }
};



const getUserData = async () => {
    try {
        return await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    } catch (error) {

    }
};

export {
    register,
    login,
    getUserData
}