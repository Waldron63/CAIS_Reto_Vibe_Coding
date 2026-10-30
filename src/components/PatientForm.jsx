import React, { useState } from 'react';
import { findOwner, newId } from '../utils/owners';

const initialFormState = {
  petName: '',
  species: 'Perro',
  breed: '',
  age: '',
};

const createGuardianRow = () => ({ rowId: newId(), ownerId: '', name: '', phone: '' });

export default function PatientForm({ owners, onAddPatient }) {
  const [formData, setFormData] = useState(initialFormState);
  const [guardians, setGuardians] = useState(() => [createGuardianRow()]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const updateGuardian = (rowId, changes) => {
    setGuardians((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, ...changes } : row))
    );
    if (error) setError('');
  };

  // Picking an existing owner fills (and locks) the row; "new" clears it.
  const handleSelectExistingOwner = (rowId, ownerId) => {
    const owner = owners.find((o) => o.id === ownerId);
    updateGuardian(rowId, {
      ownerId,
      name: owner ? owner.name : '',
      phone: owner ? owner.phone : '',
    });
  };

  const handleAddGuardian = () => {
    setGuardians((prev) => [...prev, createGuardianRow()]);
  };

  const handleRemoveGuardian = (rowId) => {
    setGuardians((prev) => prev.filter((row) => row.rowId !== rowId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.petName.trim() ||
      !formData.breed.trim() ||
      !formData.age.trim()
    ) {
      setError('Por favor, completa todos los campos de la mascota.');
      return;
    }

    if (guardians.some((row) => !row.name.trim() || !row.phone.trim())) {
      setError(
        'Cada responsable necesita nombre y teléfono (o quita la fila que no vayas a usar).'
      );
      return;
    }

    // Reuse owners that already exist (same name + phone) so a family is linked, not duplicated.
    const knownOwners = [...owners];
    const newOwners = [];
    const ownerIds = [];

    for (const row of guardians) {
      let owner = row.ownerId
        ? owners.find((o) => o.id === row.ownerId)
        : findOwner(knownOwners, row.name, row.phone);

      if (!owner) {
        owner = { id: newId(), name: row.name.trim(), phone: row.phone.trim() };
        newOwners.push(owner);
        knownOwners.push(owner);
      }

      if (ownerIds.includes(owner.id)) {
        setError('No repitas al mismo responsable en una misma mascota.');
        return;
      }
      ownerIds.push(owner.id);
    }

    const newPatient = {
      id: newId(),
      petName: formData.petName.trim(),
      species: formData.species,
      breed: formData.breed.trim(),
      age: formData.age.trim(),
      ownerIds,
      createdAt: new Date().toLocaleDateString('es-ES'),
    };

    onAddPatient(newPatient, newOwners);
    setFormData(initialFormState);
    setGuardians([createGuardianRow()]);
    setError('');
  };

  return (
    <aside className="panel">
      <h2 className="panel-title">Registrar Nuevo Paciente</h2>
      <p className="panel-subtitle">
        Ingresa los datos de la mascota y de sus responsables (puede tener más de uno).
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

        <fieldset className="guardians-fieldset">
          <legend>Responsables *</legend>

          {guardians.map((row, index) => {
            const position = index + 1;
            const isExisting = Boolean(row.ownerId);
            return (
              <div className="guardian-row" key={row.rowId}>
                <div className="guardian-row-header">
                  <strong>👤 Responsable {position}</strong>
                  {guardians.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-guardian"
                      onClick={() => handleRemoveGuardian(row.rowId)}
                      aria-label={`Quitar responsable ${position}`}
                    >
                      ✕ Quitar
                    </button>
                  )}
                </div>

                {owners.length > 0 && (
                  <div className="form-group">
                    <label htmlFor={`guardian-existing-${row.rowId}`}>
                      Responsable ya registrado
                    </label>
                    <select
                      id={`guardian-existing-${row.rowId}`}
                      value={row.ownerId}
                      onChange={(e) =>
                        handleSelectExistingOwner(row.rowId, e.target.value)
                      }
                    >
                      <option value="">➕ Nuevo responsable</option>
                      {owners.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                          {owner.name} — {owner.phone}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`guardian-name-${row.rowId}`}>
                      Nombre del responsable {position} *
                    </label>
                    <input
                      id={`guardian-name-${row.rowId}`}
                      type="text"
                      placeholder="Ej. Carlos Gómez"
                      value={row.name}
                      disabled={isExisting}
                      onChange={(e) =>
                        updateGuardian(row.rowId, { name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`guardian-phone-${row.rowId}`}>
                      Teléfono del responsable {position} *
                    </label>
                    <input
                      id={`guardian-phone-${row.rowId}`}
                      type="tel"
                      placeholder="Ej. 300 123 4567"
                      value={row.phone}
                      disabled={isExisting}
                      onChange={(e) =>
                        updateGuardian(row.rowId, { phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            className="btn-add-guardian"
            onClick={handleAddGuardian}
          >
            + Agregar otro responsable
          </button>
        </fieldset>

        <button type="submit" className="btn-submit">
          + Registrar Paciente
        </button>
      </form>
    </aside>
  );
}
