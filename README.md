![image](https://github.com/user-attachments/assets/ee282405-6aca-400d-8907-ba2fdce70854)# CSV Upload Management Frontend

Este proyecto es una aplicación frontend desarrollada con React, que permite a los usuarios autenticados con rol de administrador cargar archivos CSV para la creación de registros en una base de datos. La aplicación recibe la respuesta del servidor, mostrando un resumen de registros cargados correctamente y una lista detallada de los errores, permitiendo la corrección de los mismos.

## Tecnologías Utilizadas

- **React**: Para la construcción de la interfaz de usuario.
- **React Router**: Para la gestión de rutas en la aplicación.
- **Tailwind CSS**: Para los estilos de la interfaz de usuario.
- **Simulación de respuestas del servidor**: Usamos datos simulados para los endpoints de autenticación y carga de datos.

## Funcionalidades

### Autenticación

- **Login**: La página `/login` permite a los usuarios ingresar sus credenciales. Si las credenciales son válidas (`email: admin@mail.com`, `password: supersecret`), se almacena un token de autenticación para uso futuro.
<img src="/fileflow.png" title="login" width="500px">

- **Validación de credenciales**: Si el email o la contraseña son incorrectos, se muestra un mensaje de error: “Credenciales invalidas”.

### Página de Carga de Archivos CSV (`/`)

- **Acceso restringido**: Solo los usuarios con rol `admin` pueden acceder a esta página. Si un usuario sin el rol adecuado intenta acceder, será redirigido a `/login`.
- **Carga de archivo**: En esta página (`/`), los usuarios pueden cargar un archivo CSV mediante un formulario con un input de tipo `file`.
<img src="/upload-page.png" title="login" width="500px">

- **Botón de carga**: Al seleccionar un archivo y presionar el botón “Upload File”, el archivo es enviado para ser procesado.
<img src="/upload-page-2.png" title="login" width="500px">

### Visualización de Resultados y Corrección de Errores

- **Respuesta simulada**: Al cargar un archivo, la respuesta del servidor simula el resultado de la carga de los registros CSV.
<img src="/upload-page-3.png" title="login" width="500px">

- **Registros exitosos**: Se muestra un resumen con los registros cargados correctamente.
- **Errores de carga**: Los errores de carga se detallan por fila, y se presenta un formulario editable para que el usuario pueda corregir los errores en los campos (nombre, correo electrónico, edad) directamente en la interfaz.
- **Validación de correcciones**: La aplicación valida que el correo tenga un formato válido y que la edad sea un número positivo.
- **Reintentar carga**: El usuario puede corregir los errores y presionar “Retry” para reenviar el registro.
<img src="/retry.png" title="login" width="500px">
<img src="/retry-2.png" title="login" width="500px">

- **Nuevo archivo**: Un botón “New File” permite reiniciar el proceso, mostrando nuevamente el formulario de carga de archivos.

## Estructura de Respuesta del Servidor

### Autenticación

La respuesta al endpoint `/api/login` es simulada y tiene la siguiente estructura:

```json
{
  "ok": true,
  "data": {
    "email": "admin@mail.com",
    "name": "Mr. Admin",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

### Carga de Datos

La respuesta al endpoint `/api/upload` es simulada y tiene la siguiente estructura:

```{
  "ok": true,
  "data": {
    "success": [
      {
        "id": 1,
        "name": "Juan Perez",
        "email": "juan.perez@example.com",
        "age": 28
      }
      // Otros registros exitosos...
    ],
    "errors": [
      {
        "row": 4,
        "details": {
          "name": "El campo 'name' no puede estar vacío.",
          "email": "El formato del campo 'email' es inválido.",
          "age": "El campo 'age' debe ser un número positivo."
        }
      }
      // Otros registros con errores...
    ]
  }
}
```
### Validaciones de Campos

- **Email**: Se valida que el campo `email` tenga un formato adecuado.
- **Age**: Se valida que el campo `email` sea un número positivo.
- Se valida que los campos en el formulario no estén vacíos.

### Ejecuta el proyecto

- En la terminal de tu computador ingresa el comando
  `git clone https://github.com/tuusuario/csv-upload-management.git`
- Instala las dependencilas
  `npm install`
- Corre el proyecto con el siguiente comando
  `npm run dev`
- Ingresa con las credenciales válidas (`email: admin@mail.com`, `password: supersecret`). 

### Contribuciones
¡Las contribuciones son bienvenidas! Si tienes alguna mejora o corrección, abre un pull request.
Algunas ideas para futuras versiones son:
- Validación de Archivos CSV.
- Paginación o Scroll Infinito si el archivo tiene muchos registros.
- Filtros y ordenación.
- Mejorar la interfaz ya que es una interfaz sencilla.
- Autenticación Real con JWT
- Gestión de Roles
- Logout
- Implementar modo oscuro
- Generar base de datos para una simulación más real

  


