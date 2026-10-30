import React, { useState, useEffect } from 'react';

export default function MedicalHistorySection({
  patients,
  selectedPatientId,
  onSelectPatient,
  medicalRecords,
  onAddMedicalRecord,
  onDeleteMedicalRecord,
  isModal = false,
  onCloseModal,
}) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: todayStr,
    diagnosis: '',
    treatment: '',
  });
  const [error, setError] = useState('');

  // Asegurar que haya un paciente seleccionado válido si existen pacientes
  useEffect(() => {
    if (patients.length > 0 && !patients.some((p) => p.id === selectedPatientId)) {
      onSelectPatient(patients[0].id);
    }
  }, [patients, selectedPatientId, onSelectPatient]);

  const currentPatient = patients.find((p) => p.id === selectedPatientId) || null;

  const patientRecords = medicalRecords
    .filter((record) => record.patientId === selectedPatientId)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPatient) {
      setError('Selecciona un paciente válido para registrar la nota médica.');
      return;
    }

    if (!formData.date || !formData.diagnosis.trim() || !formData.treatment.trim()) {
      setError('Por favor, completa la fecha, el diagnóstico breve y el tratamiento prescrito.');
      return;
    }

    const newRecord = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      patientId: currentPatient.id,
      date: formData.date,
      diagnosis: formData.diagnosis.trim(),
      treatment: formData.treatment.trim(),
      createdAt: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onAddMedicalRecord(newRecord);
    setFormData({
      date: todayStr,
      diagnosis: '',
      treatment: '',
    });
    setError('');
  };

  if (patients.length === 0) {
    return (
      <div className="panel">
        <div className="warning-alert">
          ⚠️ No hay pacientes registrados. Registra primero una mascota en el Módulo 1 para gestionar su historial clínico.
        </div>
      </div>
    );
  }

  return (
    <div className={isModal ? 'history-modal-body' : 'main-container'}>
      {/* Formulario rápido para agregar nota clínica al paciente seleccionado */}
      <aside className="panel">
        <div className="history-form-header">
          <div>
            <h2 className="panel-title">Nueva Nota Médica</h2>
            <p className="panel-subtitle" style={{ marginBottom: '0.75rem' }}>
              Registra un diagnóstico y tratamiento en la ficha del paciente.
            </p>
          </div>
          {isModal && onCloseModal && (
            <button
              type="button"
              className="btn-close-modal"
              onClick={onCloseModal}
              aria-label="Cerrar ventana de historial"
            >
              ✕ Cerrar
            </button>
          )}
        </div>

        {/* Selector de paciente activo */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor={isModal ? 'modal-patient-select' : 'history-patient-select'}>
            Paciente en consulta
          </label>
          <select
            id={isModal ? 'modal-patient-select' : 'history-patient-select'}
            value={selectedPatientId || ''}
            onChange={(e) => onSelectPatient(e.target.value)}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.petName} ({p.species} - {p.breed}) — Prop: {p.ownerName}
              </option>
            ))}
          </select>
        </div>

        {currentPatient && (
          <div className="selected-patient-summary">
            <div className="summary-row">
              <strong>🐾 {currentPatient.petName}</strong>
              <span className="species-tag tag-perro">{currentPatient.species}</span>
            </div>
            <p>
              Raza: <strong>{currentPatient.breed}</strong> • Edad:{' '}
              <strong>{currentPatient.age}</strong>
            </p>
            <p>
              Propietario: <strong>{currentPatient.ownerName}</strong> (📞{' '}
              {currentPatient.ownerPhone})
            </p>
          </div>
        )}

        <form className="patient-form" onSubmit={handleSubmit}>
          {error && <div className="error-alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="date">Fecha de consulta *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="diagnosis">Diagnóstico breve *</label>
            <input
              id="diagnosis"
              name="diagnosis"
              type="text"
              placeholder="Ej. Otitis externa leve, Gastroenteritis, Control sano..."
              value={formData.diagnosis}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="treatment">Tratamiento prescrito *</label>
            <textarea
              id="treatment"
              name="treatment"
              rows={3}
              placeholder="Ej. Limpieza ótica cada 12h por 7 días + gotas antiinflamatorias..."
              value={formData.treatment}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit">
            + Guardar Nota Clínica
          </button>
        </form>
      </aside>

      {/* Historial de notas médicas del paciente */}
      <section className="panel history-timeline-panel">
        <div className="list-header" style={{ marginBottom: '1rem' }}>
          <div className="card-top">
            <div>
              <h2 className="panel-title">
                Historial Clínico de {currentPatient ? currentPatient.petName : 'Paciente'}
              </h2>
              <p className="panel-subtitle" style={{ marginBottom: 0 }}>
                Evolución médica, diagnósticos previos y tratamientos recetados.
              </p>
            </div>
            <span className="stats-badge">
              {patientRecords.length}{' '}
              {patientRecords.length === 1 ? 'nota registrada' : 'notas registradas'}
            </span>
          </div>
        </div>

        {patientRecords.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>Sin antecedentes clínicos registrados</h3>
            <p>
              Agrega la primera nota médica para{' '}
              <strong>{currentPatient?.petName}</strong> usando el formulario adjunto.
            </p>
          </div>
        ) : (
          <div className="medical-records-list">
            {patientRecords.map((record) => (
              <article key={record.id} className="medical-record-card">
                <div className="record-header">
                  <span className="record-date">📅 {record.date}</span>
                  <button
                    type="button"
                    className="btn-delete-icon"
                    onClick={() => onDeleteMedicalRecord(record.id)}
                    title="Eliminar nota médica"
                    aria-label="Eliminar nota médica"
                  >
                    🗑️
                  </button>
                </div>

                <div className="record-body">
                  <div className="record-field">
                    <span className="record-label">🩺 Diagnóstico:</span>
                    <p className="record-diagnosis">{record.diagnosis}</p>
                  </div>

                  <div className="record-field">
                    <span className="record-label">💊 Tratamiento prescrito:</span>
                    <p className="record-treatment">{record.treatment}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

