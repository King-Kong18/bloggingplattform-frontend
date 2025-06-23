import React, { useState } from "react";
import '../Styles/createNewBlog-style.css';
import { useNavigate } from "react-router";
import Header from "./HeaderIfLoggedIn";

function CreateNewBlog({ username, benutzerId, password }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      autor: {
        id: benutzerId,
        username: username,
        password: password
      },
    };

    try {
      const response = await fetch("http://localhost:8080/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Erstellen des Blogs");
      }
      setTitle("");
      setContent("");
      navigate("/start");
    } catch (error) {
      alert("Fehler: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="create-blog-container">
        <h2>Neuen Blog erstellen</h2>
        <p>Angemeldet als: {username}</p>
        <form onSubmit={handleSubmit} className="create-blog-form">
          <label>Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Inhalt</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Blog erstellen</button>
        </form>
      </div>
    </>
  );
}
export default CreateNewBlog;
