import '../Styles/blogs-style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderIfLoggedIn from './HeaderIfLoggedIn';
import { FaHeart, FaRegHeart, FaComments } from 'react-icons/fa';
import Comments from "./Comments";  // Kommentarkomponente importieren

function Blogs({ username }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsVisible, setCommentsVisible] = useState({}); // Objekt, um Sichtbarkeit je Blog zu speichern
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Willst du diesen Blog wirklich löschen?")) return;

    try {
      const response = await fetch(`http://localhost:8080/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Fehler beim Löschen");
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      alert("Fehler: " + error.message);
    }
  };

  const handleLikeToggle = async (blog) => {
    const likedBy = blog.likedByUsers || [];
    const hasLiked = likedBy.some((user) => user.username === username);
    const url = `http://localhost:8080/${blog.id}/${hasLiked ? 'unlike' : 'like'}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error("Fehler beim Liken/Unliken");

      const updatedBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          const updatedLikedBy = hasLiked
            ? b.likedByUsers.filter((user) => user.username !== username)
            : [...(b.likedByUsers || []), { username }];
          return {
            ...b,
            likedByUsers: updatedLikedBy,
            likes: hasLiked ? b.likes - 1 : b.likes + 1,
          };
        }
        return b;
      });

      setBlogs(updatedBlogs);
    } catch (err) {
      alert("Fehler: " + err.message);
    }
  };

  // Kommentar-Button toggle Funktion
  const toggleComments = (blogId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  if (loading) return <p>Lade Blogs...</p>;
  if (error) return <p style={{ color: "red" }}>Fehler: {error}</p>;

  return (
    <div>
      <HeaderIfLoggedIn />
      <h2>Willkommen zurück, {username}</h2>
      <h2>Entdecke...</h2>
      {blogs.length === 0 && <p>Keine Blogs vorhanden.</p>}
      <ul className="blogs-list">
        {blogs.map((blog) => {
          const likedBy = blog.likedByUsers || [];
          const hasLiked = likedBy.some((user) => user.username === username);
          const isCommentsVisible = commentsVisible[blog.id];

          return (
            <li key={blog.id} className="blog-post">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>Autor: {blog.autor?.username || "Unbekannt"}</small>
              <div className="btn-group">
                <button className="btn btn-like" onClick={() => handleLikeToggle(blog)}>
                  {hasLiked ? <FaHeart className="icon-like liked" /> : <FaRegHeart className="icon-like" />}
                  <span className="like-count">{blog.likes}</span>
                </button>

                <button
                  className="btn btn-comments"
                  onClick={() => toggleComments(blog.id)}
                  aria-label={isCommentsVisible ? "Kommentare ausblenden" : "Kommentare anzeigen"}
                >
                  <FaComments className="icon-comments" />
                </button>

                {blog.autor?.username === username && (
                  <>
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`/edit-blog/${blog.id}`)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Löschen
                    </button>
                  </>
                )}
              </div>

              {isCommentsVisible && (
                <Comments
                  blogId={blog.id}
                  initialComments={blog.comments}
                  username={username}
                  onAddComment={(newComment) => {
                    setBlogs((prevBlogs) =>
                      prevBlogs.map((b) =>
                        b.id === blog.id
                          ? { ...b, comments: [...(b.comments || []), newComment] }
                          : b
                      )
                    );
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Blogs;
