import React, { useState } from 'react';
import { usePosts } from './hooks/usePosts.js';
import CreatePage from './pages/CreatePage.jsx';
import PostsPage from './pages/PostsPage.jsx';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('create');
  const { posts, addPost } = usePosts();

  function handlePublish(post) {
    addPost(post);
    setCurrentPage('posts');
  }

  return (
    <div className="app">
      <nav className="app-nav">
        <span className="app-logo">Stitch Studio</span>
        <div className="app-nav-links">
          <button
            className={currentPage === 'create' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('create')}
          >
            Create
          </button>
          <button
            className={currentPage === 'posts' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('posts')}
          >
            Posts
          </button>
        </div>
      </nav>
      <main className="app-main">
        {currentPage === 'create' ? (
          <CreatePage onPublish={handlePublish} />
        ) : (
          <PostsPage posts={posts} />
        )}
      </main>
    </div>
  );
}
