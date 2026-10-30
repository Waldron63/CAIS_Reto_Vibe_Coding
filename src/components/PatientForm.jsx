import React, { useState } from 'react';

const initialFormState = {
  petName: '',
  species: 'Perro',
  breed: '',
  age: '',
  ownerName: '',
  ownerPhone: '',
};

export default function PatientForm({ onAddPatient }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');

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

    // Validación básica de campos obligatorios
    if (
      !formData.petName.trim() ||
      !formData.breed.trim() ||
      !formData.age.trim() ||
      !formData.ownerName.trim() ||
      !formData.ownerPhone.trim()
    ) {
      setError('Por favor, completa todos los campos para registrar al paciente.');
      return;
    }

    const newPatient = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      petName: formData.petName.trim(),
      species: formData.species,
      breed: formData.breed.trim(),
      age: formData.age.trim(),
      ownerName: formData.ownerName.trim(),
      ownerPhone: formData.ownerPhone.trim(),
      createdAt: new Date().toLocaleDateString('es-ES'),
    };

    onAddPatient(newPatient);
    setFormData(initialFormState);
    setError('');
  };

  return (
    <aside className="panel">
      <h2 className="panel-title">Registrar Nuevo Paciente</h2>
      <p className="panel-subtitle">
        Ingresa los datos de la mascota y de su propietario.
      </p>

      <form className="patient-form" onSubmit={handleSubmit}>
        {error && <div className="error-alert">{error}</div>}

        <div className="form-group">
          <label htmlFor="petName">Nombre de la mascota *</label>
          <input
            id="petName"
            name="petName"
            type="text"
            placeholder="Ej. Firulais, Michi..."
            value={formData.petName}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="species">Especie *</label>
            <select
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="age">Edad *</label>
            <input
              id="age"
              name="age"
              type="text"
              placeholder="Ej. 3 años, 6 meses"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="breed">Raza *</label>
          <input
            id="breed"
            name="breed"
            type="text"
            placeholder="Ej. Criollo, Labrador, Siamés..."
            value={formData.breed}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerName">Nombre del propietario *</label>
          <input
            id="ownerName"
            name="ownerName"
            type="text"
            placeholder="Ej. Carlos Gómez"
            value={formData.ownerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerPhone">Teléfono de contacto *</label>
          <input
            id="ownerPhone"
            name="ownerPhone"
            type="tel"
            placeholder="Ej. 300 123 4567"
            value={formData.ownerPhone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          + Registrar Paciente
        </button>
      </form>
    </aside>
  );
}

