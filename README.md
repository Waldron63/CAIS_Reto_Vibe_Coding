# 🩺 Veterinaria El Barrio - Frontend SPA

**Veterinaria El Barrio** es una aplicación web tipo SPA (*Single Page Application*) minimalista, intuitiva y *responsive* (*mobile-first*) para llevar el control de los **pacientes** (mascotas), sus **responsables**, sus **visitas** y su **historial clínico** en una clínica veterinaria de barrio.

Es el **frontend de la aplicación**, construido con **Vite + React (JavaScript ES6+)** y **CSS moderno**, con Hooks (`useState`, `useEffect`) y persistencia automática en `localStorage` (no necesita backend ni base de datos).

---

## 👥 Integrantes

- Natalia Espitia Espinel
- David Santiago Castro Sierra
- Jesús Alfonzo Pinzón Vega
- Santiago Gualdrón Rincón

---

## ✨ ¿Qué hace?

La pantalla tiene **4 módulos**, accesibles desde las pestañas superiores o juntos en la *Vista Completa*:

1. **🐾 Pacientes y sus responsables:**
   - Formulario para dar de alta una mascota (nombre, especie: Perro/Gato/Otro, raza y edad) con **uno o varios responsables** (nombre y teléfono cada uno). El botón **+ Agregar otro responsable** añade más filas; cada fila puede ser un responsable nuevo o uno **ya registrado** (se elige de una lista).
   - Directorio de mascotas en tarjetas, con **todos sus responsables**, contador de notas clínicas y opción de eliminar.
   - Clic en una mascota → se abre su ficha (historial clínico y **todos sus responsables**). Clic en un responsable → se abre su ficha con **todas sus mascotas**.
2. **📅 Citas / visitas:** agendar una cita para un paciente registrado (motivo, fecha, hora, estado y observaciones), cambiar su estado (Pendiente / Completada / Cancelada), filtrarlas por estado y eliminarlas. Cada cita muestra a todos los responsables de la mascota.
3. **📋 Historial clínico:** notas médicas por paciente (fecha, diagnóstico breve y tratamiento), visibles desde el módulo o desde la ficha de la mascota.
4. **👨‍👩‍👧 Responsables:** directorio de responsables con el número de mascotas de cada uno; al abrir uno se ven todas sus mascotas y desde ahí se puede saltar a la ficha de cada mascota.

### Reto 2 — una mascota puede tener varios responsables

- Mascotas y responsables forman una relación **muchos a muchos**: una mascota puede tener varios responsables y un responsable puede tener varias mascotas.
- Un responsable se reconoce por **nombre + teléfono** (sin importar mayúsculas, espacios ni el formato del teléfono): al registrar otra mascota con los mismos datos se **reutiliza** el responsable en lugar de duplicarlo, y así toda una familia queda enlazada.
- Si se elimina la última mascota de un responsable, el responsable también desaparece del directorio.
- Los datos guardados por la versión anterior (un solo propietario por mascota) **se migran automáticamente** al abrir la app.

---

## ⚡ Cómo correrla en 5 minutos

Requisitos: [Node.js 18+](https://nodejs.org/) y [Git](https://git-scm.com/) (`node -v` y `git --version` para comprobarlos).

```bash
git clone https://github.com/Waldron63/CAIS_Reto_Vibe_Coding.git
cd CAIS_Reto_Vibe_Coding
npm ci
npm run dev
```

`npm ci` reinstala las dependencias exactas de `package-lock.json` y funciona igual en Windows, macOS y Linux (usa `npm ci` y no `npm install`: el repositorio trae una carpeta `node_modules` con binarios de Windows que hay que reemplazar).

Abre **http://localhost:5173/** en el navegador. La app trae datos de ejemplo (Max, Luna y Coco) para poder probarla de inmediato.

Otros scripts:

```bash
npm run build    # Construye el proyecto para producción en dist/
npm run preview  # Vista previa local del build de producción
```

---

## ✅ Cómo verificarla

Con la app abierta en **Vista Completa**:

1. **Registrar una mascota con dos responsables:** en *Registrar Nuevo Paciente* escribe `Rex`, raza `Criollo`, edad `3 años`; en *Responsable 1* escribe `Ana Gómez` / `300 111 2222`, pulsa **+ Agregar otro responsable** y en *Responsable 2* escribe `Luis Gómez` / `300 333 4444`. Pulsa **+ Registrar Paciente**: Rex aparece en el directorio con sus dos responsables y el contador del encabezado sube.
2. **Abrir una mascota → ver todos sus responsables:** haz clic en la tarjeta de **Max** (o de Rex). En la ventana que se abre, bajo *Responsables*, salen todos: Max → Laura Martínez y Carlos Martínez.
3. **Abrir un responsable → ver todas sus mascotas:** en esa ventana haz clic en **Laura Martínez** (o usa el módulo *4. Responsables → Ver mascotas*): se listan todas sus mascotas (Max y Coco) y cada una abre su ficha con **Abrir mascota**.
4. **Lo anterior sigue funcionando:** agenda una cita en el módulo 2 (aparece con todos los responsables), pulsa **✓ Completar** y filtra por *Completada*; agrega una nota médica en el módulo 3; elimina una mascota con **Eliminar**. Al recargar la página (`F5`) los datos se conservan.

Para volver a los datos de ejemplo, ejecuta `localStorage.clear()` en la consola del navegador y recarga.

---

## 🗂️ Estructura del Proyecto

```text
CAIS_Reto_Vibe_Coding/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── BITACORA.md
└── src/
    ├── main.jsx
    ├── App.jsx                       # Estado global (pacientes, responsables, citas, notas) y modales
    ├── App.css
    ├── utils/
    │   └── owners.js                 # Relación mascota-responsables, persistencia y migración
    └── components/
        ├── PatientForm.jsx           # Módulo 1: alta de mascota con uno o varios responsables
        ├── PatientList.jsx           # Módulo 1: directorio de pacientes
        ├── PatientCard.jsx           # Módulo 1: tarjeta de mascota con sus responsables
        ├── AppointmentForm.jsx       # Módulo 2: formulario de citas
        ├── AppointmentList.jsx       # Módulo 2: panel y filtros de citas
        ├── AppointmentCard.jsx       # Módulo 2: tarjeta y estado de la cita
        ├── MedicalHistorySection.jsx # Módulo 3: historial clínico y notas médicas
        ├── OwnerList.jsx             # Módulo 4: directorio de responsables
        ├── OwnerDetail.jsx           # Módulo 4: todas las mascotas de un responsable
        └── Modal.jsx                 # Ventana modal compartida
```

---

## 🧤 Contribuciones

1. Crea una nueva rama: `git checkout -b feat/nueva-funcionalidad`
2. Realiza tus cambios y súbelos: `git commit -m "Agrega nueva funcionalidad"` y `git push origin feat/nueva-funcionalidad`
3. Abre un Pull Request y espera la revisión de otro miembro del equipo.

---

## 📖 Notas

- Los datos se guardan en el navegador (`localStorage`, claves `vet_patients_v2`, `vet_owners_v2`, `vet_appointments_v1` y `vet_medical_records_v1`), por lo que se conservan al recargar pero son propios de cada navegador.
