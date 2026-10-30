import React from 'react';
import { getPatientOwners } from '../utils/owners';

const SPECIES_EMOJI = { Perro: '🐶', Gato: '🐱', Otro: '🐾' };

export default function OwnerDetail({
  owner,
  ownerPatients,
  owners,
  onOpenPatient,
  onOpenOwner,
  onClose,
}) {
  return (
    <section className="panel">
      <div className="history-form-header">
        <div>
          <h2 className="panel-title">👤 {owner.name}</h2>
          <p className="panel-subtitle">📞 {owner.phone}</p>
        </div>
        <button
          type="button"
          className="btn-close-modal"
          onClick={onClose}
          aria-label="Cerrar ventana del responsable"
        >
          ✕ Cerrar
        </button>
      </div>

      <div className="card-top" style={{ marginBottom: '0.75rem' }}>
        <h3 className="owner-section-title">
          Mascotas de {owner.name}
        </h3>
        <span className="stats-badge">
          {ownerPatients.length}{' '}
          {ownerPatients.length === 1 ? 'mascota' : 'mascotas'}
        </span>
      </div>

      {ownerPatients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🐾</div>
          <h3>Este responsable no tiene mascotas registradas</h3>
        </div>
      ) : (
        <div className="patients-grid">
          {ownerPatients.map((patient) => {
            const coGuardians = getPatientOwners(patient, owners).filter(
              (other) => other.id !== owner.id
            );
            return (
              <article key={patient.id} className="patient-card">
                <div className="card-top">
                  <div className="pet-header">
                    <span className="species-emoji" aria-hidden="true">
                      {SPECIES_EMOJI[patient.species] || SPECIES_EMOJI.Otro}
                    </span>
                    <div>
                      <h4 className="pet-name">{patient.petName}</h4>
                      <span className="detail-value">
                        {patient.species} • {patient.breed} • {patient.age}
                      </span>
                    </div>
                  </div>
                </div>

                {coGuardians.length > 0 && (
                  <div className="guardians-box">
                    <span className="guardians-label">También a cargo de</span>
                    <ul className="guardian-list">
                      {coGuardians.map((other) => (
                        <li key={other.id}>
                          <button
                            type="button"
                            className="guardian-chip"
                            onClick={() => onOpenOwner(other.id)}
                            title={`Ver las mascotas de ${other.name}`}
                          >
                            <span>👤 {other.name}</span>
                            <small>📞 {other.phone}</small>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="patient-card-actions">
                  <button
                    type="button"
                    className="btn-history"
                    onClick={() => onOpenPatient(patient.id)}
                    aria-label={`Abrir mascota ${patient.petName}`}
                  >
                    📋 Abrir mascota
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
