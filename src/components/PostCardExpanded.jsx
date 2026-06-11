import React from 'react';
import PostThumbnail from './PostThumbnail.jsx';
import PatternDisplay from './PatternDisplay.jsx';
import Button from './Button.jsx';
import './PostCardExpanded.css';

export default function PostCardExpanded({ post, onExportPDF, onClose }) {
  return (
    <div className="expanded-overlay" onClick={onClose}>
      <div className="expanded-box" onClick={e => e.stopPropagation()}>
        <div className="expanded-header">
          <div>
            <h2 className="expanded-title">{post.meta.name}</h2>
            <p className="expanded-artist">by {post.meta.artist}</p>
          </div>
          <button className="expanded-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {post.meta.description && post.meta.description !== 'No Description' && (
          <p className="expanded-description">{post.meta.description}</p>
        )}

        <div className="expanded-body">
          <div className="expanded-art">
            <PostThumbnail grid={post.grid} palette={post.palette} size={200} />
          </div>
          <div className="expanded-pattern">
            <PatternDisplay pattern={post.pattern} isStale={false} />
          </div>
        </div>

        <div className="expanded-footer">
          <Button onClick={() => onExportPDF(post)}>Export PDF</Button>
        </div>
      </div>
    </div>
  );
}
