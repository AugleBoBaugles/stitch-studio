import React, { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import './PublishModal.css';

export default function PublishModal({ onConfirm, onClose }) {
  const [name, setName] = useState('Untitled');
  const [description, setDescription] = useState('No Description');
  const [artist, setArtist] = useState('Anonymous');

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm({
      name: name.trim() || 'Untitled',
      description: description.trim() || 'No Description',
      artist: artist.trim() || 'Anonymous',
    });
    onClose();
  }

  return (
    <Modal title="Post your pattern" onClose={onClose}>
      <form className="publish-form" onSubmit={handleSubmit}>
        <label className="publish-label">
          Pattern name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="publish-input"
            aria-label="Pattern name"
          />
        </label>
        <label className="publish-label">
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="publish-input publish-textarea"
            rows={3}
            aria-label="Description"
          />
        </label>
        <label className="publish-label">
          Artist name
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            className="publish-input"
            aria-label="Artist name"
          />
        </label>
        <div className="publish-actions">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Post pattern</Button>
        </div>
      </form>
    </Modal>
  );
}
