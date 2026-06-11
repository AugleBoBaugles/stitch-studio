const KEY = 'stitch-studio-posts';

export function loadLocalPosts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalPosts(posts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(posts));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Storage is full. Please export your patterns as PDFs to free up space.');
    }
  }
}
