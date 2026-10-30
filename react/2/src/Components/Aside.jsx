import React from "react";

export default function Aside({ posts, handleCurrentIndex }) {
  const items = posts?.map((e, index) => {
    return (
      <li onClick={() => handleCurrentIndex(index)} key={e.id}>
        {e.title}
      </li>
    );
  });
  return (
    <aside className="sidebar">
      <h2>Recent Posts</h2>
      <ul className="blog-list" id="blogList">
        {items}
      </ul>
    </aside>
  );
}
