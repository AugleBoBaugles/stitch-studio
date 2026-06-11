import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('create');

  return (
    <div className="app">
      <nav className="app-nav">
        <span className="app-logo">🧶 Stitch Studio</span>
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
          <p style={{ padding: '2rem' }}>Create page coming soon…</p>
        ) : (
          <p style={{ padding: '2rem' }}>Posts page coming soon…</p>
        )}
      </main>
    </div>
  );
}
