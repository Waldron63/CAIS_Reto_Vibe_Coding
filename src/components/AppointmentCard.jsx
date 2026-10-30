import React from 'react';

const STATUS_STYLES = {
  Pendiente: {
    badgeClass: 'status-pendiente',
    label: '⏳ Pendiente',
  },
  Completada: {
    badgeClass: 'status-completada',
    label: '✅ Completada',
  },
  Cancelada: {
    badgeClass: 'status-cancelada',
    label: '❌ Cancelada',
  },
};

const REASON_ICONS = {
  'Vacunación': '💉',
  'Control general': '🩺',
  'Urgencia': '🚨',
  'Desparasitación': '💊',
  'Cirugía / Procedimiento': '🏥',
  'Baño y Peluquería': '🛁',
};

export default function AppointmentCard({
  appointment,
  patient,
  guardians = [],
  onUpdateStatus,
  onDeleteAppointment,
}) {
  const statusConfig = STATUS_STYLES[appointment.status] || STATUS_STYLES.Pendiente;
  const reasonIcon = REASON_ICONS[appointment.reason] || '📋';

  // Usar datos vivos del paciente si sigue registrado, o el snapshot guardado
  const petName = patient ? patient.petName : appointment.petNameSnapshot;
  const species = patient ? patient.species : appointment.speciesSnapshot;

  return (
    <article className={`appointment-card status-border-${appointment.status.toLowerCase()}`}>
      <div className="card-top">
        <div className="pet-header">
          <span className="species-emoji" aria-hidden="true">
            {reasonIcon}
          </span>
          <div>
            <h3 className="pet-name">{petName}</h3>
            <span className="appointment-reason">
              {appointment.reason} • <small>{species}</small>
            </span>
          </div>
        </div>

        <span className={`status-badge ${statusConfig.badgeClass}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">📅 Fecha</span>
          <span className="detail-value">{appointment.date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">⏰ Hora</span>
          <span className="detail-value">{appointment.time}</span>
        </div>
      </div>

      {appointment.notes && (
        <p className="appointment-notes">📝 {appointment.notes}</p>
      )}

      <div className="owner-box">
        <div className="owner-info">
          {guardians.map((guardian) => (
            <div key={`${guardian.name}-${guardian.phone}`}>
              <p>👤 {guardian.name}</p>
              <span>📞 {guardian.phone}</span>
            </div>
          ))}
        </div>

        <div className="appointment-actions">
          {appointment.status !== 'Completada' && (
            <button
              type="button"
              className="btn-status btn-complete"
              onClick={() => onUpdateStatus(appointment.id, 'Completada')}
              title="Marcar cita como completada"
            >
              ✓ Completar
            </button>
          )}

          {appointment.status !== 'Pendiente' && (
            <button
              type="button"
              className="btn-status btn-pending"
              onClick={() => onUpdateStatus(appointment.id, 'Pendiente')}
              title="Marcar cita como pendiente"
            >
              ↺ Pendiente
            </button>
          )}

          {appointment.status !== 'Cancelada' && (
            <button
              type="button"
              className="btn-status btn-cancel"
              onClick={() => onUpdateStatus(appointment.id, 'Cancelada')}
              title="Cancelar cita"
            >
              ✕ Cancelar
            </button>
          )}

          <button
            type="button"
            className="btn-delete-icon"
            onClick={() => onDeleteAppointment(appointment.id)}
            title="Eliminar registro de cita"
            aria-label={`Eliminar cita de ${petName}`}
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
}

