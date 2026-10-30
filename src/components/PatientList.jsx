import React from 'react';
import PatientCard from './PatientCard';

export default function PatientList({
  patients,
  medicalRecords = [],
  selectedPatientId,
  onSelectHistory,
  onDeletePatient,
}) {
  return (
    <section>
      <div className="list-header">
        <div>
          <h2 className="panel-title">Directorio de Pacientes</h2>
          <p className="panel-subtitle" style={{ marginBottom: 0 }}>
            Haz clic en cualquier mascota para abrir su <strong>Historial Clínico</strong> y agregar notas médicas.
          </p>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🐕‍🦺</div>
          <h3>No hay pacientes registrados aún</h3>
          <p>Comienza agregando una mascota desde el formulario.</p>
        </div>
      ) : (
        <div className="patients-grid">
          {patients.map((patient) => {
            const count = medicalRecords.filter(
              (r) => r.patientId === patient.id
            ).length;
            return (
              <PatientCard
                key={patient.id}
                patient={patient}
                recordsCount={count}
                isSelected={patient.id === selectedPatientId}
                onSelectHistory={onSelectHistory}
                onDeletePatient={onDeletePatient}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
