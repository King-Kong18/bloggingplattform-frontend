import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/editBlog-style.css';

function EditBlog({ username }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/blogs/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Blog nicht gefunden");
                return res.json();
            })
            .then((data) => {
                if (data.autor.username !== username) {
                    setError("Du darfst diesen Blog nicht bearbeiten.");
                    setLoading(false);
                    return;
                }
                setBlog(data);
                setTitle(data.title);
                setContent(data.content);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/blogs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...blog, title, content }),
            });
            if (!response.ok) throw new Error("Fehler beim Aktualisieren");
            navigate("/start");
        } catch (error) {
            alert("Fehler: " + error.message);
        }
    };

    if (loading) return <p>Lade Blog...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="edit-blog-container">
            <h2>Blog bearbeiten</h2>
            <form onSubmit={handleSubmit} className="edit-blog-form">
                <label htmlFor="title">Titel</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">Inhalt</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <div className="edit-buttons">
                    <button type="submit" className="btn btn-save">Speichern</button>
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={() => navigate("/start")}
                    >
                        Abbrechen
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditBlog;
