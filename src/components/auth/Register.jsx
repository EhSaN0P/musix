import { useState } from "react";
import apiService from "../../services/apiService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import './auth.css'

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const res = await apiService.post(
                "/auth/register",
                form
            );

            dispatch(
                setCredentials({
                    user: res.data.user,
                    token: res.data.token,
                })
            );

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>ثبت نام</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="نام"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="نام کاربری"
                    value={form.username}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="ایمیل"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="رمز عبور"
                    value={form.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="تکرار رمز عبور"
                    value={form.password_confirmation}
                    onChange={handleChange}
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "در حال ثبت نام..."
                        : "ثبت نام"}
                </button>

                <Link to="/login">
                    حساب دارید؟
                </Link>
            </form>
        </div>
    );
}