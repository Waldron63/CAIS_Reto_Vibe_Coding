import React from 'react';

const SPECIES_CONFIG = {
  Perro: { emoji: '🐶', className: 'tag-perro' },
  Gato: { emoji: '🐱', className: 'tag-gato' },
  Otro: { emoji: '🐾', className: 'tag-otro' },
};

export default function PatientCard({
  patient,
  recordsCount = 0,
  isSelected = false,
  onSelectHistory,
  onDeletePatient,
}) {
  const speciesInfo = SPECIES_CONFIG[patient.species] || SPECIES_CONFIG.Otro;

  const handleCardClick = () => {
    if (onSelectHistory) {
      onSelectHistory(patient.id);
    }
  };

  return (
    <article
      className={`patient-card patient-card-clickable ${
        isSelected ? 'patient-card-selected' : ''
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Ver historial clínico de ${patient.petName}`}
    >
      <div>
        <div className="card-top">
          <div className="pet-header">
            <span className="species-emoji" aria-hidden="true">
              {speciesInfo.emoji}
            </span>
            <div>
              <h3 className="pet-name">{patient.petName}</h3>
              <span className={`species-tag ${speciesInfo.className}`}>
                {patient.species}
              </span>
            </div>
          </div>

          <span className="records-count-badge" title="Notas en historial clínico">
            📋 {recordsCount} {recordsCount === 1 ? 'nota' : 'notas'}
          </span>
        </div>

        <div className="card-details" style={{ marginTop: '0.85rem' }}>
          <div className="detail-item">
            <span className="detail-label">Raza</span>
            <span className="detail-value">{patient.breed}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Edad</span>
            <span className="detail-value">{patient.age}</span>
          </div>
        </div>
      </div>

      <div className="owner-box">
        <div className="owner-info">
          <p>👤 {patient.ownerName}</p>
          <span>📞 {patient.ownerPhone}</span>
        </div>

        <div
          className="patient-card-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="btn-history"
            onClick={() => onSelectHistory && onSelectHistory(patient.id)}
          >
            📋 Historial Clínico
          </button>

          <button
            type="button"
            className="btn-delete"
            onClick={() => onDeletePatient(patient.id)}
            aria-label={`Eliminar a ${patient.petName}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
