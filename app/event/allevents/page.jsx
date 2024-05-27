'use client'
import React, { useEffect, useState } from 'react';

function AllEvents() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.location}</p>
          {post.imageId && (
            <img src={post.image} alt={post.title} width={500} height={300} />
          )}
          <p>{post.date}</p>
          <p>{post.time}</p>
          <p>{post.body}</p>
        
        </div>
      ))}
    </div>
  );
}

export default AllEvents;