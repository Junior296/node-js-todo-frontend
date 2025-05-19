import { useEffect, useState } from "react";
import { register } from '../services/userServices'
import { toast } from "react-toastify";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);

    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-header bg-primary text-white text-center py-3">
                    <h2 className="mb-0">Register</h2>
                </div>
                <div className="card-body p-4">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success" disabled={!formData.username || !formData.password}>Register</button>
                        </div>
                        <a href="/login" className="nav-link text-primary text-end mt-3">Login Here</a>
                        
                    </form>
                </div>
            </div>
        </div>

    );
}