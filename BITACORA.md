## Reto 1
•⁠  ⁠Datos: Nos tomo 20 minutos y 4 prompts, uno por cada funcionalidad y uno para el Readme.md
-Qué hicimos y qué decidió la IA por nosotros: Se hizo un promt con Gemini para darle el contexto de la aplicacion y que dividiera las tres funcionalidades de la aplicacion. La cuota fue de 8% aproximadamente del límite diario.
-Qué nos sorprendió o salió mal: Nos sorprendió el tiempo que le tomó a la IA hacer la aplicación.
-Qué haríamos distinto: Optimizar más el tiempo para lograr probar adecuadamente la aplicación.

## Reto 2
-Datos: ___ minutos (completar) y 2 prompts: uno con el enunciado completo del reto y la instrucción de decidir todo sin preguntar, y uno para terminar y aclarar que prompts.txt no se sube.
-Qué hicimos y qué decidió la IA por nosotros: Se pasó de un propietario por mascota a una relación muchos a muchos (mascotas con varios responsables y responsables con varias mascotas). La IA decidió: guardar los responsables como entidad propia, reconocer al mismo responsable por nombre + teléfono para reutilizarlo y no duplicarlo, permitir elegir un responsable ya registrado al crear una mascota, agregar un cuarto módulo "Responsables" con su ficha (modal) que lista todas sus mascotas, borrar al responsable cuando se elimina su última mascota y migrar automáticamente los datos guardados del Reto 1. Además verificó los cuatro criterios en el navegador (registro con dos responsables, ficha de mascota, ficha de responsable y regresión de citas/historial) y reescribió el README (estaba duplicado).
-Qué nos sorprendió o salió mal: node_modules estaba versionado en el repo con binarios solo de Windows, por lo que no compila en Mac sin reinstalar. El README tenía todo su contenido repetido dos veces. La vista completa tiene dos campos con id="date" (formulario de citas y de notas médicas).
-Qué haríamos distinto: Definir desde el Reto 1 el modelo de datos con responsables como entidad separada, agregar un .gitignore desde el inicio (node_modules/dist) y sumar pruebas automáticas para no depender solo de la verificación manual.
