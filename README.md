# 📌 Estructura del Proyecto

Este proyecto sigue un flujo de datos basado en la arquitectura clásica:

📌 **Base de Datos** → **Backend** → **Frontend**

Cada capa cumple una función específica en la gestión y presentación de la información.

## 🖥️ Backend (Spring Boot)

El backend está organizado en diferentes capas, cada una con una responsabilidad clara:

- **Controllers** 🎯 → Son los endpoints que reciben las peticiones del frontend.
- **Services** ⚙️ → Contienen la lógica de negocio y orquestan las operaciones.
- **Repositories** 🗄️ → Se encargan de las consultas SQL a la base de datos.
- **Models** 📄 → Representan las entidades o tablas creadas en la base de datos.
- **DTOs** 📦 → Se utilizan para transferir datos entre backend y frontend.

## 🎨 Frontend (Angular + Tailwind)

El frontend está estructurado en varias secciones según su funcionalidad:

📂 **admin-dashboard/** → Panel de administración para gestionar la plataforma.  
📂 **home/** → Página principal accesible para usuarios no logueados.  
📂 **net/** → Sección exclusiva para usuarios autenticados.  
📂 **login-pages/** → Páginas de phishing utilizadas en el proyecto de concienciación.  
📂 **components/** → Componentes comunes reutilizables en todo el frontend.

📕 **api.service.ts** → Archivo que gestiona las peticiones HTTP entre el frontend y el backend.

## 🗄️ Base de Datos (MySQL)

Las principales tablas del sistema son:

- 📊 **Users** → Guarda la información de los usuarios registrados.
- 📊 **Roles** → Contiene los roles de los usuarios (actualmente solo "user" y "admin").
- 📊 **User_Roles** → Relaciona los usuarios con sus roles.
- 📊 **FakeAttempts** → Almacena los intentos de phishing enviados a los usuarios.

---

## 🔄 **Flujo de datos habitual**

1️⃣ **Registro y envío de phishing:**
- Cuando un usuario se registra, recibe un correo de confirmación.
- Tras confirmar, se le enviará un intento de phishing cada **6 días**.
- Se dejarán de enviar intentos si el usuario tiene más de **20 puntos** o si desactiva la opción en su perfil.

2️⃣ **Selección del intento de phishing:**
- Se elige **aleatoriamente** entre las plantillas de la base de datos cuyo código termine en `-pick`.

3️⃣ **Penalización por caer en phishing:**
- Si el usuario **abre el intento de phishing**, se le **restan 2 puntos**.
- Si además **introduce datos en la página falsa**, se le **restan 5 puntos** en total.

4️⃣ **Recompensa por no caer en phishing:**
- Si el usuario **no abre el correo en 2 días**, se le **suman 2 puntos**.

