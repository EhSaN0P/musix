import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import apiService from "../../../services/apiService";

import "./Profile.css";
import {useDispatch} from "react-redux";
import { setUser as setReduxUser } from "../../../store/authSlice.js";
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile");
    const dispatch = useDispatch();
     const [avatar, setAvatar] = useState();

    const ProfileSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
            .required("نام کاربری الزامی است"),

        bio: Yup.string()
            .max(
                500,
                "بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"
            ),
    });

    const SecuritySchema = Yup.object().shape({
        currentPassword: Yup.string().required(
            "وارد کردن رمز عبور فعلی الزامی است"
        ),

        newPassword: Yup.string()
            .min(
                8,
                "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"
            )
            .required(
                "وارد کردن رمز عبور جدید الزامی است"
            ),

        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("newPassword"), null],
                "رمز عبور جدید و تکرار آن مطابقت ندارند!"
            )
            .required("تکرار رمز عبور الزامی است"),
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiService.get("/auth/me");

                setUser(res.data.user);

                if (res.data.user?.avatar_url) {
                    setAvatar(res.data.user.avatar_url);
                } else if (res.data.user?.avatar) {
                    setAvatar(res.data.user.avatar);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("type", "user");

            const uploadRes = await apiService.post(
                "/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            const res = await apiService.put(
                "/profile",
                {
                    name: user.name,
                    avatar: uploadRes.data.path,
                    bio: user.bio,
                }
            );

            setUser(res.data);
            setAvatar(res.data.avatar_url ?? res.data.avatar);
            dispatch(setReduxUser(res.data));

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="user-settings-container">
                <div className="glass-panel">
                    <p>در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

     return (
        <div className="user-settings-container">
            <div className="glass-panel">
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${
                            activeTab === "profile"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("profile")
                        }
                    >
                        ویرایش پروفایل
                    </button>

                    <button
                        className={`tab-btn ${
                            activeTab === "security"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("security")
                        }
                    >
                        امنیت و رمز عبور
                    </button>
                </div>


                {activeTab === "profile" && (
                    <div className="profile-content-wrapper fade-in">
                        <div className="avatar-section">
                            <div className="avatar-wrapper">
                                <img
                                    src={avatar || "/images/artist/default.png"}
                                    alt="User Avatar"
                                    className="avatar-img"
                                />

                                <label className="avatar-upload-btn">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <span>تغییر</span>
                                </label>
                            </div>

                            <span className="avatar-hint">
                                فرمت‌های مجاز: JPG,
                                PNG
                            </span>
                        </div>

                        <div className="form-section">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    username:
                                        user?.name || "",
                                    bio: user?.bio || "",

                                }}
                                validationSchema={
                                    ProfileSchema
                                }
                                onSubmit={async (
                                    values,
                                    {
                                        setSubmitting,
                                    }
                                ) => {
                                    try {
                                        const res =
                                            await apiService.put(
                                                "/profile",
                                                {
                                                    name: values.username,
                                                     avatar,
                                                    bio: values.bio,
                                                }
                                            );

                                        setUser(
                                            res.data
                                        );
                                        dispatch(setReduxUser(res.data));

                                        alert(
                                            "پروفایل بروزرسانی شد"
                                        );
                                    } catch (err) {
                                        console.error(
                                            err
                                        );
                                    } finally {
                                        setSubmitting(
                                            false
                                        );
                                    }
                                }}
                            >
                                {({
                                      isSubmitting,
                                  }) => (
                                    <Form className="formik-form">
                                        <div className="form-group">
                                            <label>
                                                نام
                                                کاربری
                                            </label>

                                            <Field
                                                type="text"
                                                name="username"
                                                className="glass-input"
                                            />

                                            <ErrorMessage
                                                name="username"
                                                component="div"
                                                className="error-text"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                بیوگرافی
                                            </label>

                                            <Field
                                                name="bio"
                                                as="textarea"
                                                maxLength={500}
                                                className="glass-input"
                                            />

                                            <ErrorMessage
                                                name="bio"
                                                component="div"
                                                className="error-text"
                                            />
                                        </div>


                                        <button
                                            type="submit"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="submit-btn"
                                        >
                                            {isSubmitting
                                                ? "در حال ذخیره..."
                                                : "ذخیره نام کاربری"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="security-content-wrapper fade-in">
                        <div
                            className="form-section"
                            style={{
                                maxWidth:
                                    "500px",
                                margin:
                                    "0 auto",
                            }}
                        >
                            <h3
                                style={{
                                    color:
                                        "var(--text-main)",
                                    marginBottom:
                                        "25px",
                                    textAlign:
                                        "center",
                                }}
                            >
                                تغییر رمز عبور
                            </h3>

                            <Formik
                                initialValues={{
                                    currentPassword:
                                        "",
                                    newPassword:
                                        "",
                                    confirmPassword:
                                        "",
                                }}
                                validationSchema={
                                    SecuritySchema
                                }
                                onSubmit={async (
                                    values,
                                    {
                                        setSubmitting,
                                        resetForm,
                                    }
                                ) => {
                                    try {
                                        await apiService.put(
                                            "/profile/password",
                                            {
                                                currentPassword: values.currentPassword,
                                                newPassword: values.newPassword,
                                                newPassword_confirmation: values.confirmPassword,
                                            }
                                        );

                                        alert(
                                            "رمز عبور با موفقیت تغییر کرد"
                                        );

                                        resetForm();
                                    } catch (
                                        err
                                        ) {
                                        console.error(
                                            err
                                        );
                                    } finally {
                                        setSubmitting(
                                            false
                                        );
                                    }
                                }}
                            >
                                {({
                                      isSubmitting,
                                  }) => (
                                    <Form className="formik-form">
                                        <div className="form-group">
                                            <label>
                                                رمز
                                                عبور
                                                فعلی
                                            </label>

                                            <Field
                                                type="password"
                                                name="currentPassword"
                                                className="glass-input"
                                            />

                                            <ErrorMessage
                                                name="currentPassword"
                                                component="div"
                                                className="error-text"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                رمز
                                                عبور
                                                جدید
                                            </label>

                                            <Field
                                                type="password"
                                                name="newPassword"
                                                className="glass-input"
                                            />

                                            <ErrorMessage
                                                name="newPassword"
                                                component="div"
                                                className="error-text"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>
                                                تکرار
                                                رمز
                                                عبور
                                            </label>

                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                className="glass-input"
                                            />

                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="error-text"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={
                                                isSubmitting
                                            }
                                            className="submit-btn"
                                        >
                                            {isSubmitting
                                                ? "در حال بروزرسانی..."
                                                : "بروزرسانی رمز عبور"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
