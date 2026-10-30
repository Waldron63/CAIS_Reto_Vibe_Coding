# 🩺 Veterinaria El Barrio - Frontend SPA

**Veterinaria El Barrio** es una aplicación web tipo SPA (*Single Page Application*) minimalista, intuitiva y *responsive* (*mobile-first*) diseñada para gestionar la operación diaria de una clínica veterinaria de barrio.

Este repositorio corresponde al **frontend de la aplicación**, construido con **Vite + React (JavaScript ES6+)** y **CSS moderno**, utilizando Hooks (`useState`, `useEffect`) y persistencia automática en `localStorage`.

---

## 👥 Integrantes

- Natalia Espitia Espinel
- David Santiago Castro Sierra
- Jesús Alfonzo Pinzón Vega
- Santiago Gualdrón Rincón

---

## ✨ Funcionalidades Principales

1. **🐾 Gestión y Registro de Pacientes (Mascotas y Propietarios):**
   - Formulario interactivo para dar de alta mascotas (nombre, especie: Perro/Gato/Otro, raza, edad, nombre del propietario y teléfono de contacto).
   - Directorio en tiempo real mediante tarjetas interactivas con contador de notas clínicas y opción para eliminar registros.
2. **📅 Módulo de Agendamiento y Control de Citas / Visitas:**
   - Programación de citas vinculadas directamente a los pacientes registrados (`<select>` dinámico).
   - Registro de motivo de visita (Vacunación, Control general, Urgencia, Desparasitación, etc.), fecha, hora, observaciones y estado.
   - Panel de control con filtros rápidos por estado (`Todas`, `⏳ Pendientes`, `Completada`, `Cancelada`) y botones de acción rápida para cambiar el estado de la cita.
3. **📋 Historial Clínico Rápido y Notas Médicas por Paciente:**
   - Acceso inmediato al historial clínico haciendo clic sobre cualquier paciente del directorio (mediante modal interactivo) o desde el módulo dedicado en la pantalla principal.
   - Formulario rápido para agregar nuevas notas clínicas por paciente (fecha de consulta, diagnóstico breve y tratamiento prescrito).

---

## 🚀 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js 18+](https://nodejs.org/)
- [npm 9+](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/)
- (Opcional) [Visual Studio Code](https://code.visualstudio.com/)

Verifica las versiones con:

```bash
node -v
npm -v
git --version
```

---

## 📦 Clonar el repositorio

Abre una terminal en el directorio donde quieras guardar el proyecto y ejecuta:

```bash
git clone <URL_DEL_REPOSITORIO>
cd CAIS_Reto_Vibe_Coding
```

---

## ⚡ Instalar dependencias

Ejecuta los siguientes comandos para instalar las dependencias del frontend:

```bash
npm install --legacy-peer-deps
npm i
```

---

## 🏃‍♂️ Ejecutar el proyecto en local

```bash
npm run dev
```

El proyecto se ejecutará normalmente en:

```text
http://localhost:5173/
```

---

## 📦 Scripts útiles

Además de `npm run dev`, puedes usar otros scripts definidos en `package.json`:

```bash
npm run build    # Construye el proyecto para producción en la carpeta dist/
npm run preview  # Vista previa local del build de producción
```

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
    ├── App.jsx
    ├── App.css
    └── components/
        ├── PatientForm.jsx          # Módulo 1: Formulario de pacientes
        ├── PatientList.jsx          # Módulo 1: Lista/directorio de pacientes
        ├── PatientCard.jsx          # Módulo 1: Tarjeta de mascota
        ├── AppointmentForm.jsx      # Módulo 2: Formulario de citas médicas
        ├── AppointmentList.jsx      # Módulo 2: Panel y filtros de citas
        ├── AppointmentCard.jsx      # Módulo 2: Tarjeta y control de estado de cita
        └── MedicalHistorySection.jsx # Módulo 3: Historial clínico y notas médicas
```

---

## 🧤 Contribuciones

1. Crea una nueva rama:
```bash
git checkout -b feat/nueva-funcionalidad
```

2. Realiza tus cambios y súbelos:
```bash
git commit -m "Agrega nueva funcionalidad"
git push origin feat/nueva-funcionalidad
```

3. Abre un Pull Request y espera la revisión de otro miembro del equipo.

---

## 📖 Notas

- Los datos de pacientes, citas e historial clínico se almacenan y sincronizan automáticamente en el navegador mediante `localStorage`, por lo que tus pruebas se conservarán al recargar la página.


---

## ✨ Funcionalidades Principales

1. **🐾 Gestión y Registro de Pacientes (Mascotas y Propietarios):**
   - Formulario interactivo para dar de alta mascotas (nombre, especie: Perro/Gato/Otro, raza, edad, nombre del propietario y teléfono de contacto).
   - Directorio en tiempo real mediante tarjetas interactivas con contador de notas clínicas y opción para eliminar registros.
2. **📅 Módulo de Agendamiento y Control de Citas / Visitas:**
   - Programación de citas vinculadas directamente a los pacientes registrados (`<select>` dinámico).
   - Registro de motivo de visita (Vacunación, Control general, Urgencia, Desparasitación, etc.), fecha, hora, observaciones y estado.
   - Panel de control con filtros rápidos por estado (`Todas`, `⏳ Pendientes`, `Completada`, `Cancelada`) y botones de acción rápida para cambiar el estado de la cita.
3. **📋 Historial Clínico Rápido y Notas Médicas por Paciente:**
   - Acceso inmediato al historial clínico haciendo clic sobre cualquier paciente del directorio (mediante modal interactivo) o desde el módulo dedicado en la pantalla principal.
   - Formulario rápido para agregar nuevas notas clínicas por paciente (fecha de consulta, diagnóstico breve y tratamiento prescrito).

---

## 🚀 Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js 18+](https://nodejs.org/)
- [npm 9+](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/)
- (Opcional) [Visual Studio Code](https://code.visualstudio.com/)

Verifica las versiones con:

```bash
node -v
npm -v
git --version
```

---

## 📦 Clonar el repositorio

Abre una terminal en el directorio donde quieras guardar el proyecto y ejecuta:

```bash
git clone <URL_DEL_REPOSITORIO>
cd CAIS_Reto_Vibe_Coding
```

---

## ⚡ Instalar dependencias

Ejecuta los siguientes comandos para instalar las dependencias del frontend:

```bash
npm install --legacy-peer-deps
npm i
```

---

## 🏃‍♂️ Ejecutar el proyecto en local

```bash
npm run dev
```

El proyecto se ejecutará normalmente en:

```text
http://localhost:5173/
```

---

## 📦 Scripts útiles

Además de `npm run dev`, puedes usar otros scripts definidos en `package.json`:

```bash
npm run build    # Construye el proyecto para producción en la carpeta dist/
npm run preview  # Vista previa local del build de producción
```

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
    ├── App.jsx
    ├── App.css
    └── components/
        ├── PatientForm.jsx          # Módulo 1: Formulario de pacientes
        ├── PatientList.jsx          # Módulo 1: Lista/directorio de pacientes
        ├── PatientCard.jsx          # Módulo 1: Tarjeta de mascota
        ├── AppointmentForm.jsx      # Módulo 2: Formulario de citas médicas
        ├── AppointmentList.jsx      # Módulo 2: Panel y filtros de citas
        ├── AppointmentCard.jsx      # Módulo 2: Tarjeta y control de estado de cita
        └── MedicalHistorySection.jsx # Módulo 3: Historial clínico y notas médicas
```

---

## 🧤 Contribuciones

1. Crea una nueva rama:
```bash
git checkout -b feat/nueva-funcionalidad
```

2. Realiza tus cambios y súbelos:
```bash
git commit -m "Agrega nueva funcionalidad"
git push origin feat/nueva-funcionalidad
```

3. Abre un Pull Request y espera la revisión de otro miembro del equipo.

---

## 📖 Notas

- Los datos de pacientes, citas e historial clínico se almacenan y sincronizan automáticamente en el navegador mediante `localStorage`, por lo que tus pruebas se conservarán al recargar la página.