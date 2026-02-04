# API para Task Manager App (Express + Typescript)
Servicios rest elaborados con Express y Typescript, resaltando lo siguiente:
- Arquitectura DDD
- Aplicación de principios SOLID y Clean Architecture
- Patrón Repository
- Persistencia de datos en Firestore
- Uso de estandar de respuesta en todos los endpoints
- Manejo de errores
- Generación de token de autenticación.
- Validación de APIs protegidas
- Implementación de Softdelete


## Funcionalidades principales
La solución cuenta con los siguientes servicios disponibles:
- Verificación de existencia de usuario con email.
- Registro de usuario a través de email.
- Lista de tareas del usuario ordenadas por fecha de creación.
- Actualización de datos de tarea (Titulo o descripción)
- Eliminación de tarea (Eliminación a nivel de sistema, debido a la implementación de Softdelete)
- Creación de nueva tarea del usuario autenticado

## Instalación local y ejecución
# 1. Clonar repositorio
git clone https://github.com/FCamposP/ATOM-Backend.git

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
# Puedes obtener un proyecto web de ejemplo en el repositorio: https://github.com/FCamposP/ATOM-Frontend.git

# 4. Ejecutar en desarrollo
npm run dev


## Instalación CI/CD
# En la ruta .github/workflows/deploy-functions.yml puedes encontrar un ejemplo para implementarlo un despliegue automático en firebase cloudfunctions

