import React, { useState } from 'react';
import PostThumbnail from './PostThumbnail.jsx';
import PostCardExpanded from './PostCardExpanded.jsx';
import Button from './Button.jsx';
import './PostCard.css';

export default function PostCard({ post, onExportPDF }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="post-card" onClick={() => setExpanded(true)}>
        <PostThumbnail grid={post.grid} palette={post.palette} size={120} />
        <div className="post-card-info">
          <h3 className="post-card-name">{post.meta.name}</h3>
          <p className="post-card-artist">by {post.meta.artist}</p>
          {post.meta.description && post.meta.description !== 'No Description' && (
            <p className="post-card-description">{post.meta.description}</p>
          )}
        </div>
        <div className="post-card-actions" onClick={e => e.stopPropagation()}>
          <Button variant="secondary" onClick={() => onExportPDF(post)}>Export PDF</Button>
        </div>
      </div>

      {expanded && (
        <PostCardExpanded
          post={post}
          onExportPDF={onExportPDF}
          onClose={() => setExpanded(false)}
        />
      )}
    </>
  );
}
