## Reto 1
- Datos: Nos tomo 20 minutos y 4 prompts, uno por cada funcionalidad y uno para el Readme.md
- Qué hicimos y qué decidió la IA por nosotros: Se hizo un promt con Gemini para darle el contexto de la aplicacion y que dividiera las tres funcionalidades de la aplicacion. La cuota fue de 8% aproximadamente del límite diario.
- Qué nos sorprendió o salió mal: Nos sorprendió el tiempo que le tomó a la IA hacer la aplicación.
- Qué haríamos distinto: Optimizar más el tiempo para lograr probar adecuadamente la aplicación.
- Con lo que ya vimos en el curso, cambiaríamos: escribir antes del primer prompt una spec mínima con criterios falsables (la app corre con `npm ci && npm run dev` en menos de 5 minutos, hay al menos 3 funciones visibles, el README trae pasos para verificarla) y convertirla en un arnés, un script `verify` que se ejecute al terminar; así el tiempo que faltó para probar bien se vuelve una compuerta y no una corazonada. (Agregado después de la clase)

## Reto 2
- Datos: ~25 minutos (estimado) y 3 prompts.
- Qué hicimos y qué decidió la IA por nosotros: Una mascota pasó de tener un solo propietario a poder tener varios responsables, y cada responsable puede tener varias mascotas. La IA decidió guardar a los responsables como una entidad propia (se reconocen por nombre y teléfono para no duplicarlos), agregar un módulo "Responsables" con su ficha y migrar automáticamente los datos del Reto 1. Verificó en el navegador los cuatro criterios y actualizó el README.
- Qué nos sorprendió o salió mal: El README tenía su contenido repetido dos veces y la vista completa tiene dos campos con id="date".
- Qué haríamos distinto: Definir desde el Reto 1 el modelo con los responsables como entidad separada y sumar pruebas automáticas para no depender solo de la verificación manual.
- Con lo que ya vimos en el curso, cambiaríamos: registrar el modelo de datos en un ADR (responsable como entidad propia, identidad por nombre y teléfono, copia de la mascota y los responsables en cada cita) con sus alternativas y consecuencias (homónimos, duplicados por errores de tipeo) y protegerlo con fitness functions automáticas: todo responsable tiene al menos una mascota y la migración de los datos del Reto 1 no pierde nada. (Agregado después de la clase)

## Reto 3
- Datos: ~30 minutos (estimado: de las 08:50 a las 09:20) y 2 prompts principales: uno con el enunciado del reto, las reglas de trabajo sobre código ajeno y las tareas, y uno para recordar actualizar el README del proyecto heredado. Fork: https://github.com/Waldron63/CAIS12-RetosVibeCodingHeredado
- Qué hicimos y qué decidió la IA por nosotros: Se trabajó sobre el proyecto de otro equipo (monorepo pnpm generado con Replit: API Express + SQLite + React) leyendo solo su README y su código. Se siguió su README al pie de la letra para correrlo, se corrigieron los problemas que impedían o ensuciaban la ejecución y se completó lo que faltaba del Reto 2 (una mascota con varios responsables, ficha de mascota con todos sus responsables y ficha de responsable con todas sus mascotas) antes de implementar el Reto 3 (vista de las visitas de los últimos 30 días y exportación a CSV con mascota, responsable, fecha y motivo). La IA decidió: guardar los responsables como entidad propia y reconocerlos por nombre + teléfono; mantener compatibles el formato antiguo de la API (un solo propietario) y las bases de datos ya creadas (migración automática); guardar la fecha y la hora de las visitas y leerlas con la hora de Bogotá; definir "últimos 30 días" como hoy más los 29 días anteriores; generar el CSV en la API (con BOM para Excel y protección contra fórmulas); añadir pruebas automáticas (28), `pnpm dev` como comando único y actualizar el README del proyecto heredado. No se tocó la bitácora de los compañeros ni se borró nada de lo suyo.
- Qué nos sorprendió o salió mal: Sorprendió que lo entregado no corría tal cual: `pnpm install` terminaba con error en pnpm 12 (scripts de build de esbuild sin aprobar), el README apuntaba a un puerto (5000, ocupado por AirPlay en macOS) y a una variable (LOCAL_API_ORIGIN) que no existen en el código, y `pnpm run build` fallaba por el lienzo de diseño de Replit. El Reto 2 no estaba hecho. Había errores reales: la hora de las visitas se perdía y la fecha se corría un día (una consulta a las 8:30 p. m. quedaba al día siguiente y no contaba como "hoy"), nombres o motivos con solo espacios daban error 500, la edad decimal que permitía el formulario era rechazada por la API con un volcado de Zod, y la búsqueda trataba `%` y `_` como comodines. Quedaron restos de plantilla sin usar (`lib/db` de Postgres y un hook de Replit que siempre falla por pedir DATABASE_URL). No pudimos reproducir el fallo del frontend que ellos reportaron: en macOS con Node 24 y pnpm 12 arrancó bien incluso con el instalador en error. Salvavidas (1 pregunta de 60 s): sin usar; la pregunta sugerida es "¿Con qué comando, versión de Node y pnpm, y con qué error les falló el frontend en la fase 2?".
- Qué haríamos distinto: Cronometrar desde el inicio los 5 minutos para correr el proyecto heredado y apuntar cada tropiezo como hallazgo, escribir las pruebas antes de cambiar el código, no confiar en el README sin contrastarlo con el código y comprobar en el original cada defecto antes de corregirlo. Y, al entregar un proyecto, fijar las versiones de Node y pnpm, probar desde un clon limpio y dejar un comando único para ejecutarlo.
- Con lo que ya vimos en el curso, cambiaríamos: aplicar trazabilidad de criterio a evidencia (cada criterio de aceptación enlazado a una prueba automática concreta) y usar CI como compuerta (typecheck, pruebas y build) para aceptar código heredado, tomando los 5 minutos de arranque como criterio falsable y no como impresión. (Agregado después de la clase)

## Reto 4
- Datos: ~15 minutos (estimado) y 3 prompts: uno con el enunciado del reto, uno con los hallazgos que nos hicieron los compañeros como contexto y uno para recordar documentarlo.
- Qué hicimos y qué decidió la IA por nosotros: Probamos el fork de los compañeros que heredaron nuestra app (AlejandroHenao2572), en una copia temporal para no tocar el clon. Primero leyó su código y su README y luego lo ejecutó y verificó los 4 criterios en el navegador. Para intentar romperlo decidió probar los bordes del rango (hace 29 y 30 días, hoy 23:59, mañana), simular el paso del tiempo, cargar 5.000 citas, corromper el localStorage, meter texto hostil en el CSV (`;`, comillas, saltos de línea y fórmulas), un intento de XSS y la vista en móvil. Hallazgos para Miro:
  - Criterio 1: ok. La pestaña "Últimos 30 días" existe y lista las visitas de la más reciente a la más antigua.
  - Criterio 2: ok. Entra hace 29 días y salen hace 30 días, mañana y las fechas con otro formato; la ventana se mueve al cambiar la fecha.
  - Criterio 3: ok. Descarga `visitas_ultimos_30_dias_AAAA-MM-DD.csv` con Mascota;Responsable;Fecha;Motivo, UTF-8 con BOM y escapado correcto; con 5.000 citas tarda unos 0,1 s.
  - Criterio 4: ok con una falla. Funcionan responsables múltiples, citas, borrados y persistencia, pero una cita sin `status` deja la pantalla en blanco al abrir la app.
- Qué nos sorprendió o salió mal: Una sola cita sin `status` rompe toda la app (sin error boundary) y solo se recupera borrando el localStorage. El CSV no neutraliza fórmulas de Excel (celdas que empiezan con `=`, `+`, `-` o `@`). Un JSON corrupto se descarta en silencio y se pisa con los datos de ejemplo. Cuentan como visitas las citas canceladas y las pendientes sin atender, y el CSV no trae el estado. Con separador `;` Excel en configuración en-US abre todo en una sola columna. La vista no se actualiza sola pasada la medianoche. El README del fork manda a clonar nuestro repo original (que no tiene el Reto 3) y la pestaña "Vista Completa" sigue diciendo 4 módulos. No hay pruebas automáticas ni confirmación al borrar, y `npm audit` reporta 2 vulnerabilidades de herramientas de desarrollo (1 moderada en esbuild y 1 alta en vite).
- Qué haríamos distinto: Escribir los casos de prueba antes de abrir la app e incluir desde el inicio datos incompletos o corruptos y fechas en los bordes, automatizar esas pruebas para repetirlas y validar la forma de los datos guardados antes de renderizarlos.
- Con lo que ya vimos en el curso, cambiaríamos: poner guardrails en el borde de los datos (validar con un esquema lo que se lee de localStorage, un error boundary en la raíz y un CSV que neutralice fórmulas) y convertir los hallazgos en un arnés de pruebas adversariales (datos corruptos, fechas en los bordes, texto hostil) que corra en CI como compuerta. (Agregado después de la clase)

### Hallazgos del Reto 4 (Agregado después de la clase)
**Lo que recibimos del otro equipo (sobre nuestra app):**
- Es un frontend sin backend ni autenticación: todo, incluidos nombres y teléfonos de los responsables, vive en localStorage en texto plano; cualquiera con acceso al navegador puede leerlo o alterarlo, y no hay roles, auditoría ni cifrado aunque son datos personales.
- No hay verificación de lo guardado: se hace JSON.parse sin validar la forma de los datos; una cita sin status rompería AppointmentCard (`appointment.status.toLowerCase()`) y un valor corrupto podría tumbar la pantalla o pasar sin aviso.
- Los datos son locales a cada navegador, sin sincronización ni copia de seguridad; un localStorage.clear() o una cuota llena lo pierde todo y los errores de guardado solo van a console.error.
- Hay inconsistencias de integridad: al borrar un paciente no se eliminan sus notas médicas (quedan huérfanas) y las citas guardan una copia (snapshot) de la mascota y los responsables que puede desincronizarse del dato real.
- El responsable se identifica por nombre más teléfono: dos homónimos con el mismo teléfono se fusionan y un error de tipeo crea un duplicado.
- Borrar citas y pacientes es inmediato: no hay confirmación en App.jsx.
- Los datos de ejemplo tienen fechas fijas de octubre de 2026 e ids como '101', y el formato de fecha es inconsistente (createdAt del paciente en dd/mm/yyyy y el resto en ISO).
- Faltan pruebas automáticas y linting; node_modules estuvo en el repositorio hasta hace poco y npm ci avisa de 2 vulnerabilidades (1 moderada, 1 alta) que nadie ha revisado.
- La app permite agregar teléfonos negativos a los responsables.
- La app no valida nombres iguales al crear responsables.

**Lo que encontramos al probar su fork (Reto 3):**
- Criterios 1, 2 y 3 en ok; criterio 4 en ok con una falla.
- Una cita sin `status` deja la pantalla en blanco al abrir la app (sin error boundary) y solo se recupera borrando todo el localStorage.
- El CSV no neutraliza fórmulas de Excel (celdas que empiezan con `=`, `+`, `-` o `@`) y, con separador `;`, Excel en configuración en-US lo abre en una sola columna.
- Un JSON corrupto se descarta en silencio y se pisa con los datos de ejemplo.
- Cuentan como visitas las citas canceladas y las pendientes sin atender, y el CSV no trae el estado.
- La vista no se actualiza sola pasada la medianoche; el README manda a clonar nuestro repo original (que no tiene el Reto 3) y la pestaña "Vista Completa" sigue diciendo 4 módulos.
- No hay pruebas automáticas ni lint, y `npm audit` reporta las mismas 2 vulnerabilidades (1 moderada en esbuild y 1 alta en vite, solo en herramientas de desarrollo). El fork no tocó el formulario de pacientes, así que hereda los teléfonos negativos y los nombres iguales sin validar.

**¿Tenían razón?** Sí, en todos los puntos; los confirmamos en el código o reproduciéndolos:
- Reproducidos: la cita sin status (pantalla en blanco), el JSON corrupto (descartado en silencio), las notas huérfanas (tras borrar a Max quedó 1 nota suya), el borrado sin confirmación y las 2 vulnerabilidades de `npm audit`.
- Confirmados en el código: sin pruebas ni lint, ids '101' y createdAt en dd/mm/yyyy, datos en texto plano en localStorage y errores de guardado solo en console.error.
- Teléfonos negativos: solo se exige que el campo no esté vacío y `-300` se normaliza igual que `300`, así que dos responsables distintos pueden fusionarse.
- Nombres iguales: mismo nombre y mismo teléfono se fusionan sin aviso, y mismo nombre con otro teléfono crea otro responsable sin aviso.
- Correctos pero por diseño: no hay backend (el Reto 1 pedía una app web), la copia (snapshot) de las citas conserva el historial aunque se borre la mascota y la identidad por nombre más teléfono fue nuestra decisión del Reto 2.

**¿Qué arreglaríamos?** (propuestas en orden de prioridad; por regla de la microentrega no se cambió código):
- Validar con un esquema lo que se lee de localStorage, poner un error boundary en la raíz, avisar al usuario cuando los datos estén corruptos o la cuota esté llena y ofrecer exportar e importar una copia de seguridad.
- Validar el teléfono (dígitos, espacios, `+` y guiones, con longitud razonable y sin negativos) y avisar de homónimos: "ya existe Ana Pérez con otro teléfono, ¿es la misma persona?".
- Pedir confirmación al borrar y borrar, o avisar, las notas médicas del paciente.
- En el CSV: neutralizar fórmulas, agregar el estado y decidir si las canceladas cuentan como visitas.
- Agregar pruebas automáticas y lint como compuerta de CI y actualizar vite para cerrar las vulnerabilidades.

## Síntesis (Agregado después de la clase)
- El cambio más caro fue pasar de un propietario a varios responsables (Reto 2) y, en el Reto 3, de fecha a fecha con hora: cada uno tocó modelo, migración, contrato y todas las vistas, y salió caro porque ninguna decisión estaba escrita ni protegida por pruebas.
- La IA escribe en minutos lo que cuesta mucho más entender y probar: entender el proyecto heredado y reproducir sus defectos tomó más que implementar el reto, y probar el fork tomó ~15 minutos para 9 hallazgos que un arnés habría detectado en segundos.
- El código plausible esconde huecos (fechas en UTC, validación, datos corruptos, fórmulas en el CSV) que solo aparecen con pruebas adversariales; verificar cuesta más que generar.
- Cambiar es barato solo cuando hay pruebas que avisen qué se rompió; sin ellas cada cambio obliga a volver a probar todo a mano.
- Decisión para el proyecto integrador: antes del primer prompt escribir una spec con criterios falsables, un arnés de pruebas y CI como compuerta (typecheck, pruebas y build), y validar la forma de los datos en el borde; no se entrega nada que no la pase.
