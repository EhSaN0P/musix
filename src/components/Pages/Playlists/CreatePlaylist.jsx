import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useApiQuery } from "../../../hooks/useApi.js";
import apiService from "../../../services/apiService.js";
import MediaCard from "../../Cards/MediaGridCard.jsx";
import "../Home/Home.css";

export default function CreatePlaylist() {
    const [refreshKey, setRefreshKey] = useState(0);
    const { data } = useApiQuery(["my-playlists", refreshKey], "/playlists");
    const playlists = data?.data || [];

    const uploadCover = async (file) => {
        if (!file) return null;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "playlist");
        const response = await apiService.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.path;
    };

    const deletePlaylist = async (playlist) => {
        await apiService.delete(`/playlists/${playlist.slug}`);
        setRefreshKey(key => key + 1);
    };

    return (
        <div className="home-container">
            <div className="header-vibe">
                <h2>Create Playlist</h2>
                <p>Manage your playlists</p>
            </div>

            <Formik
                initialValues={{ title: "", description: "", is_public: true, cover: null }}
                onSubmit={async (values, { resetForm, setSubmitting }) => {
                    try {
                        const coverPath = await uploadCover(values.cover);
                        await apiService.post("/playlists", {
                            title: values.title,
                            description: values.description,
                            is_public: values.is_public,
                            cover_image: coverPath,
                        });
                        resetForm();
                        setRefreshKey(key => key + 1);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="formik-form">
                        <Field name="title" className="glass-input" placeholder="Title" />
                        <Field name="description" as="textarea" className="glass-input" placeholder="Description" />
                        <label>
                            <Field name="is_public" type="checkbox" />
                            Public
                        </label>
                        <input type="file" accept="image/*" onChange={(event) => setFieldValue("cover", event.currentTarget.files[0])} />
                        <button className="submit-btn" type="submit" disabled={isSubmitting}>Create</button>
                    </Form>
                )}
            </Formik>

            <div className="content-grid">
                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <MediaCard item={playlist} />
                        <button className="submit-btn" onClick={() => deletePlaylist(playlist)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
