// Comments.jsx
import React, { useState, useEffect } from "react";
import "../Styles/comments-style.css";

function Comments({ blogId, username }) {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [loading, setLoading] = useState(false);

    // Beim Laden: Kommentare abrufen
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments/${blogId}`);
            if (!response.ok) throw new Error("Fehler beim Laden der Kommentare");
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error(error.message);
        }
    };
    
    useEffect(() => {

        fetchComments();
    }, [blogId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/comments/${blogId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newCommentText.trim(),
                    author: username
                }),
            });

            if (!response.ok) throw new Error("Kommentar konnte nicht hinzugefügt werden");

            const savedComment = await response.json();
            setComments((prev) => [...prev, savedComment]);
            setNewCommentText("");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comments-container">
            <h4>Kommentare</h4>
            {comments.length === 0 && <p className="no-comments">Noch keine Kommentare.</p>}

            <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <strong>{comment.author}</strong>
                            <span className="comment-date">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                    </li>
                ))}
            </ul>

            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    className="comment-input"
                    placeholder="Schreibe einen Kommentar..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    rows={3}
                    disabled={loading}
                />
                <button type="submit" className="comment-submit-btn" disabled={loading}>
                    {loading ? "Senden..." : "Kommentar hinzufügen"}
                </button>
            </form>
        </div>
    );
}

export default Comments;
