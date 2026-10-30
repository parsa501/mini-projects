import React, { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Body({ post }) {
  // const res=await fetch(`http://localhost:3000/comments?postId=${post.id}`)
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/comments?postId=${post.id}`
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [post]);
  const items = comments?.map((e) => <Comment key={e.id} comment={e} />);
  return (
    <main className="content">
      <section className="blog-post">
        <img
          src={`assets/${post.image}`}
          alt="Blog Image"
          className="blog-image"
          id="blogImage"
        />
        <h1 className="blog-title" id="blogTitle">
          {post.title}
        </h1>
        <p className="blog-description" id="blogDescription">
          {post.description}
        </p>
      </section>

      <section className="comments-section">
        <h3>Comments</h3>
        {comments?.length > 0 ? (
          <div className="comments-container" id="commentsContainer">
            {items}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>
    </main>
  );
}
