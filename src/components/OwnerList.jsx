import React from 'react';
import { getOwnerPatients } from '../utils/owners';

export default function OwnerList({ owners, patients, onOpenOwner }) {
  return (
    <section className="panel owners-panel">
      <div className="list-header">
        <h2 className="panel-title">Directorio de Responsables</h2>
        <p className="panel-subtitle" style={{ marginBottom: 0 }}>
          Haz clic en un responsable para ver <strong>todas sus mascotas</strong>.
        </p>
      </div>

      {owners.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👨‍👩‍👧</div>
          <h3>No hay responsables registrados aún</h3>
          <p>Se crean al registrar una mascota desde el Módulo 1.</p>
        </div>
      ) : (
        <div className="patients-grid">
          {owners.map((owner) => {
            const ownerPatients = getOwnerPatients(owner, patients);
            return (
              <article key={owner.id} className="patient-card">
                <div className="card-top">
                  <div className="pet-header">
                    <span className="species-emoji" aria-hidden="true">
                      👤
                    </span>
                    <div>
                      <h3 className="pet-name">{owner.name}</h3>
                      <span className="detail-value">📞 {owner.phone}</span>
                    </div>
                  </div>
                  <span className="records-count-badge">
                    🐾 {ownerPatients.length}{' '}
                    {ownerPatients.length === 1 ? 'mascota' : 'mascotas'}
                  </span>
                </div>

                <p className="owner-pets-preview">
                  {ownerPatients.map((patient) => patient.petName).join(', ')}
                </p>

                <div className="patient-card-actions">
                  <button
                    type="button"
                    className="btn-history"
                    onClick={() => onOpenOwner(owner.id)}
                    aria-label={`Ver mascotas de ${owner.name}`}
                  >
                    🐾 Ver mascotas
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
