import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import MedicalHistorySection from './components/MedicalHistorySection';

const INITIAL_PATIENTS = [
  {
    id: '1',
    petName: 'Max',
    species: 'Perro',
    breed: 'Golden Retriever',
    age: '4 años',
    ownerName: 'Laura Martínez',
    ownerPhone: '310 456 7890',
    createdAt: '30/10/2026',
  },
  {
    id: '2',
    petName: 'Luna',
    species: 'Gato',
    breed: 'Criollo',
    age: '2 años',
    ownerName: 'Andrés Pérez',
    ownerPhone: '315 987 6543',
    createdAt: '30/10/2026',
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: '101',
    patientId: '1',
    petNameSnapshot: 'Max',
    speciesSnapshot: 'Perro',
    ownerNameSnapshot: 'Laura Martínez',
    ownerPhoneSnapshot: '310 456 7890',
    reason: 'Vacunación',
    date: '2026-10-31',
    time: '09:30',
    status: 'Pendiente',
    notes: 'Refuerzo anual séxtuple + rabia',
    createdAt: '2026-10-30T07:50:00.000Z',
  },
  {
    id: '102',
    patientId: '2',
    petNameSnapshot: 'Luna',
    speciesSnapshot: 'Gato',
    ownerNameSnapshot: 'Andrés Pérez',
    ownerPhoneSnapshot: '315 987 6543',
    reason: 'Control general',
    date: '2026-10-31',
    time: '11:00',
    status: 'Pendiente',
    notes: 'Revisión de peso y chequeo dental',
    createdAt: '2026-10-30T07:50:00.000Z',
  },
];

const INITIAL_MEDICAL_RECORDS = [
  {
    id: '501',
    patientId: '1',
    date: '2026-10-15',
    diagnosis: 'Dermatitis alérgica leve en abdomen',
    treatment: 'Baños medicados con clorhexidina cada 5 días y Omega 3 oral por 15 días.',
    createdAt: '10:15',
  },
  {
    id: '502',
    patientId: '2',
    date: '2026-10-20',
    diagnosis: 'Control sano y profilaxis antiparasitaria',
    treatment: 'Pipeta antipulgas mensual + desparasitante interno de amplio espectro (dosis única).',
    createdAt: '15:40',
  },
];

export default function App() {
  // 1. Estado de Pacientes con persistencia en localStorage
  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem('vet_patients_v1');
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  // 2. Estado de Citas con persistencia en localStorage
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('vet_appointments_v1');
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // 3. Estado de Historial Clínico con persistencia en localStorage
  const [medicalRecords, setMedicalRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('vet_medical_records_v1');
      return saved ? JSON.parse(saved) : INITIAL_MEDICAL_RECORDS;
    } catch {
      return INITIAL_MEDICAL_RECORDS;
    }
  });

  // Paciente seleccionado para ver/agregar su historial clínico
  const [selectedPatientId, setSelectedPatientId] = useState(
    patients.length > 0 ? patients[0].id : ''
  );

  // Control del Modal de Historial Clínico al hacer clic en un paciente de la lista
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Pestaña activa ('all' | 'patients' | 'appointments' | 'history')
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem('vet_patients_v1', JSON.stringify(patients));
    } catch (err) {
      console.error('Error guardando pacientes en localStorage:', err);
    }
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem('vet_appointments_v1', JSON.stringify(appointments));
    } catch (err) {
      console.error('Error guardando citas en localStorage:', err);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'vet_medical_records_v1',
        JSON.stringify(medicalRecords)
      );
    } catch (err) {
      console.error('Error guardando historial clínico en localStorage:', err);
    }
  }, [medicalRecords]);

  // Handlers de Funcionalidad 1: Pacientes
  const handleAddPatient = (newPatient) => {
    setPatients((prevPatients) => [newPatient, ...prevPatients]);
    setSelectedPatientId(newPatient.id);
  };

  const handleDeletePatient = (id) => {
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );
    if (selectedPatientId === id) {
      const remaining = patients.filter((p) => p.id !== id);
      setSelectedPatientId(remaining.length > 0 ? remaining[0].id : '');
      setIsHistoryModalOpen(false);
    }
  };

  // Al hacer clic en un paciente de la lista, abrimos su modal de Historial Clínico Rápido
  const handleOpenPatientHistory = (patientId) => {
    setSelectedPatientId(patientId);
    setIsHistoryModalOpen(true);
  };

  // Handlers de Funcionalidad 2: Citas
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleUpdateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments((prev) => prev.filter((app) => app.id !== appointmentId));
  };

  // Handlers de Funcionalidad 3: Historial Clínico y Notas Médicas
  const handleAddMedicalRecord = (newRecord) => {
    setMedicalRecords((prev) => [newRecord, ...prev]);
  };

  const handleDeleteMedicalRecord = (recordId) => {
    setMedicalRecords((prev) => prev.filter((rec) => rec.id !== recordId));
  };

  const pendingAppointmentsCount = appointments.filter(
    (a) => a.status === 'Pendiente'
  ).length;

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true">
              🩺
            </div>
            <div>
              <h1>Veterinaria El Barrio</h1>
              <p>Pacientes • Citas • Historial Clínico</p>
            </div>
          </div>

          <div className="header-badges">
            <span className="stats-badge">
              🐾 {patients.length}{' '}
              {patients.length === 1 ? 'paciente' : 'pacientes'}
            </span>
            <span className="stats-badge badge-amber">
              ⏳ {pendingAppointmentsCount}{' '}
              {pendingAppointmentsCount === 1
                ? 'cita pendiente'
                : 'citas pendientes'}
            </span>
            <span className="stats-badge badge-indigo">
              📋 {medicalRecords.length}{' '}
              {medicalRecords.length === 1 ? 'nota médica' : 'notas médicas'}
            </span>
          </div>
        </div>

        {/* Barra de navegación con las 3 funciones principales y vista integrada */}
        <nav className="module-tabs" aria-label="Navegación principal de la clínica">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            🏥 Vista Completa (3 Módulos)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            1. 🐶 Pacientes ({patients.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            2. 📅 Citas ({appointments.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            3. 📋 Historial Clínico ({medicalRecords.length})
          </button>
        </nav>
      </header>

      <div className="sections-wrapper">
        {/* FUNCIONALIDAD 1: GESTIÓN Y REGISTRO DE PACIENTES */}
        {(activeTab === 'all' || activeTab === 'patients') && (
          <section className="module-block">
            <div className="module-banner">
              <h2>1. 🐾 Gestión y Registro de Pacientes (Mascotas y Propietarios)</h2>
            </div>
            <main className="main-container">
              <PatientForm onAddPatient={handleAddPatient} />
              <PatientList
                patients={patients}
                medicalRecords={medicalRecords}
                selectedPatientId={selectedPatientId}
                onSelectHistory={handleOpenPatientHistory}
                onDeletePatient={handleDeletePatient}
              />
            </main>
          </section>
        )}

        {/* FUNCIONALIDAD 2: AGENDAMIENTO Y CONTROL DE CITAS */}
        {(activeTab === 'all' || activeTab === 'appointments') && (
          <section className="module-block">
            <div className="module-banner">
              <h2>2. 📅 Módulo de Agendamiento y Control de Citas / Visitas</h2>
            </div>
            <main className="main-container">
              <AppointmentForm
                patients={patients}
                onAddAppointment={handleAddAppointment}
              />
              <AppointmentList
                appointments={appointments}
                patients={patients}
                onUpdateStatus={handleUpdateAppointmentStatus}
                onDeleteAppointment={handleDeleteAppointment}
              />
            </main>
          </section>
        )}

        {/* FUNCIONALIDAD 3: HISTORIAL CLÍNICO RÁPIDO Y NOTAS MÉDICAS */}
        {(activeTab === 'all' || activeTab === 'history') && (
          <section className="module-block" id="modulo-historial">
            <div className="module-banner">
              <h2>3. 📋 Historial Clínico Rápido y Notas Médicas por Paciente</h2>
            </div>
            <MedicalHistorySection
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              medicalRecords={medicalRecords}
              onAddMedicalRecord={handleAddMedicalRecord}
              onDeleteMedicalRecord={handleDeleteMedicalRecord}
            />
          </section>
        )}
      </div>

      {/* MODAL DE DETALLE DE HISTORIAL CLÍNICO AL HACER CLIC EN UN PACIENTE */}
      {isHistoryModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsHistoryModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Historial clínico del paciente"
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <MedicalHistorySection
              patients={patients}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              medicalRecords={medicalRecords}
              onAddMedicalRecord={handleAddMedicalRecord}
              onDeleteMedicalRecord={handleDeleteMedicalRecord}
              isModal={true}
              onCloseModal={() => setIsHistoryModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
