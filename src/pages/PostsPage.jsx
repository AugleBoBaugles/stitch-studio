import React from 'react';
import PostCard from '../components/PostCard.jsx';
import { exportPostToPDF } from '../lib/pdfExport.js';
import './PostsPage.css';

export default function PostsPage({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="posts-empty">
        <p>No patterns posted yet. Create one on the <strong>Create</strong> page!</p>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <h1 className="posts-heading">Patterns</h1>
      <div className="posts-list">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onExportPDF={exportPostToPDF}
          />
        ))}
      </div>
    </div>
  );
}
