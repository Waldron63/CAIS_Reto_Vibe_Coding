import React from 'react';

export default function Modal({ label, onClose, children }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
