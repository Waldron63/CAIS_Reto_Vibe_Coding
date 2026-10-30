import React, { useState, useEffect } from 'react';

const VISIT_REASONS = [
  'Control general',
  'Vacunación',
  'Desparasitación',
  'Urgencia',
  'Cirugía / Procedimiento',
  'Baño y Peluquería',
];

export default function AppointmentForm({ patients, onAddAppointment }) {
  const [formData, setFormData] = useState({
    patientId: patients.length > 0 ? patients[0].id : '',
    reason: 'Control general',
    date: '',
    time: '',
    status: 'Pendiente',
    notes: '',
  });
  const [error, setError] = useState('');

  // Mantener sincronizado el patientId por defecto cuando cambie la lista de pacientes
  useEffect(() => {
    if (patients.length === 0) {
      setFormData((prev) => ({ ...prev, patientId: '' }));
    } else if (!patients.some((p) => p.id === formData.patientId)) {
      setFormData((prev) => ({ ...prev, patientId: patients[0].id }));
    }
  }, [patients, formData.patientId]);

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

    if (patients.length === 0) {
      setError('Primero debes registrar al menos un paciente para agendar una cita.');
      return;
    }

    if (!formData.patientId || !formData.reason || !formData.date || !formData.time) {
      setError('Por favor, selecciona el paciente, motivo, fecha y hora de la cita.');
      return;
    }

    const selectedPatient = patients.find((p) => p.id === formData.patientId);

    const newAppointment = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      patientId: formData.patientId,
      petNameSnapshot: selectedPatient ? selectedPatient.petName : 'Mascota',
      speciesSnapshot: selectedPatient ? selectedPatient.species : 'Otro',
      ownerNameSnapshot: selectedPatient ? selectedPatient.ownerName : '',
      ownerPhoneSnapshot: selectedPatient ? selectedPatient.ownerPhone : '',
      reason: formData.reason,
      date: formData.date,
      time: formData.time,
      status: formData.status,
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddAppointment(newAppointment);

    setFormData((prev) => ({
      ...prev,
      reason: 'Control general',
      date: '',
      time: '',
      status: 'Pendiente',
      notes: '',
    }));
    setError('');
  };

  return (
    <aside className="panel">
      <h2 className="panel-title">Programar Nueva Cita</h2>
      <p className="panel-subtitle">
        Agenda una visita médica vinculada a un paciente registrado.
      </p>

      {patients.length === 0 ? (
        <div className="warning-alert">
          ⚠️ No hay pacientes registrados. Registra una mascota primero para poder asignarle una cita.
        </div>
      ) : (
        <form className="patient-form" onSubmit={handleSubmit}>
          {error && <div className="error-alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="patientId">Paciente seleccionado *</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.petName} ({patient.species}) — Prop: {patient.ownerName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Motivo de la visita *</label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              {VISIT_REASONS.map((reasonOption) => (
                <option key={reasonOption} value={reasonOption}>
                  {reasonOption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Fecha de la cita *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Hora *</label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado inicial *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pendiente">⏳ Pendiente</option>
              <option value="Completada">✅ Completada</option>
              <option value="Cancelada">❌ Cancelada</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Observaciones (opcional)</label>
            <input
              id="notes"
              name="notes"
              type="text"
              placeholder="Ej. Traer carnet de vacunación, ayuno de 8h..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit">
            📅 Agendar Cita
          </button>
        </form>
      )}
    </aside>
  );
}

