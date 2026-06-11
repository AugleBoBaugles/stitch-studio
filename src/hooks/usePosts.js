import { useState, useCallback } from 'react';
import { loadLocalPosts, saveLocalPosts } from '../lib/localStorage.js';
import samplePosts from '../data/samplePosts.json';

function mergeAndSort(localPosts, samples) {
  const localIds = new Set(localPosts.map(p => p.id));
  const merged = [
    ...localPosts,
    ...samples.filter(p => !localIds.has(p.id)),
  ];
  return merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function usePosts() {
  const [posts, setPosts] = useState(() => {
    const local = loadLocalPosts();
    return mergeAndSort(local, samplePosts);
  });

  const addPost = useCallback((post) => {
    setPosts(() => {
      const localPosts = loadLocalPosts();
      const updated = [post, ...localPosts];
      saveLocalPosts(updated);
      return mergeAndSort(updated, samplePosts);
    });
  }, []);

  return { posts, addPost };
}
