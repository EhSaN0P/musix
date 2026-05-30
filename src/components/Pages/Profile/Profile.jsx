import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Profile.css';

const Profile = () => {
    // گرفتن عکس از لوکال استوریج یا استفاده از عکس پیش‌فرض
    const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || 'https://via.placeholder.com/150');
    const [activeTab, setActiveTab] = useState('profile');

    // اعتبارسنجی فرم پروفایل
    const ProfileSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
            .required('نام کاربری الزامی است'),
        bio: Yup.string()
            .max(150, 'بیوگرافی نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد'),
    });

    // اعتبارسنجی فرم امنیت (تغییر رمز عبور)
    const SecuritySchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required('وارد کردن رمز عبور فعلی الزامی است'),
        newPassword: Yup.string()
            .min(8, 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد')
            .required('وارد کردن رمز عبور جدید الزامی است'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'رمز عبور جدید و تکرار آن مطابقت ندارند!')
            .required('تکرار رمز عبور الزامی است'),
    });

    // تبدیل عکس به Base64 و ذخیره در State و LocalStorage
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                localStorage.setItem('userAvatar', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="user-settings-container">
            <div className="glass-panel">

                {/* تب‌های تنظیمات */}
                <div className="settings-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        ویرایش پروفایل
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        امنیت و رمز عبور
                    </button>
                </div>

                {/* ===================== تب پروفایل ===================== */}
                {activeTab === 'profile' && (
                    <div className="profile-content-wrapper fade-in">

                        {/* ستون عکس پروفایل */}
                        <div className="avatar-section">
                            <div className="avatar-wrapper">
                                <img src={avatar} alt="User Avatar" className="avatar-img" />
                                <label className="avatar-upload-btn">
                                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                                    <span>تغییر</span>
                                </label>
                            </div>
                            <span className="avatar-hint">فرمت‌های مجاز: JPG, PNG</span>
                        </div>

                        {/* فرم پروفایل */}
                        <div className="form-section">
                            <Formik
                                initialValues={{ username: 'کاربر دمو', bio: 'عاشق موسیقی و برنامه‌نویسی' }}
                                validationSchema={ProfileSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        alert('اطلاعات پروفایل با موفقیت ذخیره شد!\n' + JSON.stringify(values, null, 2));
                                        setSubmitting(false);
                                    }, 600);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="formik-form">
                                        <div className="form-group">
                                            <label>نام کاربری</label>
                                            <Field type="text" name="username" className="glass-input" />
                                            <ErrorMessage name="username" component="div" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>بیوگرافی</label>
                                            <Field as="textarea" name="bio" className="glass-input textarea" rows="4" />
                                            <ErrorMessage name="bio" component="div" className="error-text" />
                                        </div>

                                        <button type="submit" disabled={isSubmitting} className="submit-btn">
                                            {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}

                {/* ===================== تب امنیت ===================== */}
                {activeTab === 'security' && (
                    <div className="security-content-wrapper fade-in">
                        <div className="form-section" style={{ maxWidth: '500px', margin: '0 auto' }}>
                            <h3 style={{ color: 'var(--text-main)', marginBottom: '25px', textAlign: 'center' }}>تغییر رمز عبور</h3>

                            <Formik
                                initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                                validationSchema={SecuritySchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    setTimeout(() => {
                                        alert('رمز عبور با موفقیت تغییر کرد! 🔒');
                                        resetForm(); // پاک کردن فرم بعد از موفقیت
                                        setSubmitting(false);
                                    }, 800);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="formik-form">

                                        <div className="form-group">
                                            <label>رمز عبور فعلی</label>
                                            <Field type="password" name="currentPassword" className="glass-input" placeholder="••••••••" />
                                            <ErrorMessage name="currentPassword" component="div" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>رمز عبور جدید</label>
                                            <Field type="password" name="newPassword" className="glass-input" placeholder="حداقل ۸ کاراکتر" />
                                            <ErrorMessage name="newPassword" component="div" className="error-text" />
                                        </div>

                                        <div className="form-group">
                                            <label>تکرار رمز عبور جدید</label>
                                            <Field type="password" name="confirmPassword" className="glass-input" placeholder="تکرار رمز عبور..." />
                                            <ErrorMessage name="confirmPassword" component="div" className="error-text" />
                                        </div>

                                        <button type="submit" disabled={isSubmitting} className="submit-btn">
                                            {isSubmitting ? 'در حال بروزرسانی...' : 'بروزرسانی رمز عبور'}
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
