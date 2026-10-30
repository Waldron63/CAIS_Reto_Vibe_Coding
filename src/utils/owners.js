const PATIENTS_KEY = 'vet_patients_v2';
const OWNERS_KEY = 'vet_owners_v2';
const LEGACY_PATIENTS_KEY = 'vet_patients_v1';

export const newId = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

const normalizeName = (name) => name.trim().toLowerCase().replace(/\s+/g, ' ');
const normalizePhone = (phone) => phone.replace(/\D/g, '');

// Two entries are the same owner when name and phone digits match.
export const findOwner = (owners, name, phone) =>
  owners.find(
    (owner) =>
      normalizeName(owner.name) === normalizeName(name) &&
      normalizePhone(owner.phone) === normalizePhone(phone)
  );

export const getPatientOwners = (patient, owners) =>
  (patient.ownerIds || [])
    .map((ownerId) => owners.find((owner) => owner.id === ownerId))
    .filter(Boolean);

export const getOwnerPatients = (owner, patients) =>
  patients.filter((patient) => (patient.ownerIds || []).includes(owner.id));

export const formatOwnerNames = (patientOwners) =>
  patientOwners.map((owner) => owner.name).join(', ');

// Appointments store a snapshot so they stay readable after a patient is deleted.
export const getAppointmentSnapshotOwners = (appointment) => {
  if (appointment.ownersSnapshot) return appointment.ownersSnapshot;
  if (appointment.ownerNameSnapshot) {
    return [
      { name: appointment.ownerNameSnapshot, phone: appointment.ownerPhoneSnapshot },
    ];
  }
  return [];
};

const readJson = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Converts v1 patients (single ownerName/ownerPhone) into patients + shared owners.
const migrateLegacyPatients = (legacyPatients) => {
  const owners = [];
  const patients = legacyPatients.map(({ ownerName, ownerPhone, ...patient }) => {
    if (!ownerName) return { ...patient, ownerIds: [] };

    let owner = findOwner(owners, ownerName, ownerPhone || '');
    if (!owner) {
      owner = { id: newId(), name: ownerName, phone: ownerPhone || '' };
      owners.push(owner);
    }
    return { ...patient, ownerIds: [owner.id] };
  });
  return { patients, owners };
};

export const loadPeople = (defaults) => {
  const patients = readJson(PATIENTS_KEY);
  const owners = readJson(OWNERS_KEY);
  if (Array.isArray(patients) && Array.isArray(owners)) {
    return { patients, owners };
  }

  const legacyPatients = readJson(LEGACY_PATIENTS_KEY);
  if (Array.isArray(legacyPatients)) {
    return migrateLegacyPatients(legacyPatients);
  }

  return defaults;
};

export const savePeople = ({ patients, owners }) => {
  try {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
    localStorage.setItem(OWNERS_KEY, JSON.stringify(owners));
  } catch (err) {
    console.error('Error guardando pacientes y responsables en localStorage:', err);
  }
};
