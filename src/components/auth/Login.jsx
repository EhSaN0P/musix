import { useState } from "react";
import apiService from "../../services/apiService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import './auth.css'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
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

            const res = await apiService.post("/auth/login", form);

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
                <h2>ورود</h2>

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

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "در حال ورود..." : "ورود"}
                </button>

                <Link to="/register">
                    حساب ندارید؟
                </Link>
            </form>
        </div>
    );
}