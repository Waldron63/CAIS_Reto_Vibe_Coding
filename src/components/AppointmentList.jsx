import React, { useState } from 'react';
import AppointmentCard from './AppointmentCard';

export default function AppointmentList({
  appointments,
  patients,
  onUpdateStatus,
  onDeleteAppointment,
}) {
  // Por defecto permite ver todas o filtrar rápidamente las pendientes
  const [statusFilter, setStatusFilter] = useState('Todas');

  const counts = {
    Todas: appointments.length,
    Pendiente: appointments.filter((a) => a.status === 'Pendiente').length,
    Completada: appointments.filter((a) => a.status === 'Completada').length,
    Cancelada: appointments.filter((a) => a.status === 'Cancelada').length,
  };

  const filteredAppointments = appointments
    .filter((app) => (statusFilter === 'Todas' ? true : app.status === statusFilter))
    .sort((a, b) => {
      const dateA = `${a.date}T${a.time}`;
      const dateB = `${b.date}T${b.time}`;
      return dateA.localeCompare(dateB);
    });

  return (
    <section>
      <div className="list-header">
        <div className="list-header-top">
          <div>
            <h2 className="panel-title">Control de Citas y Visitas</h2>
            <p className="panel-subtitle" style={{ marginBottom: 0 }}>
              Gestiona el estado de cada visita médica o filtra las citas pendientes.
            </p>
          </div>
        </div>

        {/* Barra de filtros rápidos por estado */}
        <div className="filter-pills" role="tablist" aria-label="Filtrar citas por estado">
          {['Todas', 'Pendiente', 'Completada', 'Cancelada'].map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'Pendiente' ? '⏳ Pendientes' : status}
              <span className="pill-count">{counts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>
            {statusFilter === 'Todas'
              ? 'No hay citas programadas'
              : `No hay citas con estado "${statusFilter}"`}
          </h3>
          <p>
            {statusFilter === 'Todas'
              ? 'Usa el formulario para programar la primera visita.'
              : 'Cambia el filtro superior para ver otras citas registradas.'}
          </p>
        </div>
      ) : (
        <div className="patients-grid">
          {filteredAppointments.map((appointment) => {
            const linkedPatient = patients.find(
              (p) => p.id === appointment.patientId
            );
            return (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                patient={linkedPatient}
                onUpdateStatus={onUpdateStatus}
                onDeleteAppointment={onDeleteAppointment}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

