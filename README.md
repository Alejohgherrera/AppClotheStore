# 🛍️ AppClotheStore

Aplicación móvil de comercio electrónico para una tienda de ropa **premium y urbana**, dirigida a hombres y mujeres que buscan prendas modernas, exclusivas y de alta calidad.

El proyecto está siendo desarrollado progresivamente con **React Native + Expo**, siguiendo una metodología de **Spec-Driven Development (SDD)**: primero se define la especificación, después el plan, luego las tareas y finalmente se implementa la funcionalidad.

---

## 🎯 Misión

Construir una experiencia de compra móvil elegante, moderna y fluida para una marca de moda urbana premium.

AppClotheStore busca combinar:

* Moda urbana contemporánea.
* Identidad visual premium.
* Experiencia de usuario sencilla y fluida.
* Catálogo de productos cuidadosamente seleccionado.
* Proceso de compra seguro y sin fricciones.

La aplicación estará orientada tanto a **hombres como mujeres**.

---

## ✨ Características previstas

El proyecto se desarrollará progresivamente.

### 🏗️ Fundamentos

* [x] Configuración inicial del proyecto.
* [x] Sistema visual / Theme.
* [x] Arquitectura base de la aplicación.
* [x] Navegación inicial.
* [x] Modelo de productos.

### 👕 Catálogo

* [x] Catálogo de productos.
* [x] Categorías.
* [x] Búsqueda.
* [x] Filtros.
* [x] Detalle de producto.
* [ ] Tallas y variantes.
* [ ] Gestión de stock.

### 🛒 Experiencia de compra

* [ ] Carrito — prototipo local en remediación.
* [ ] Favoritos.
* [ ] Gestión de cantidades.
* [ ] Resumen de compra.

### 👤 Usuarios

* [ ] Registro.
* [ ] Inicio de sesión.
* [ ] Perfil.
* [ ] Direcciones de envío.

### 💳 Pedidos y pagos

* [ ] Checkout.
* [ ] Integración de pagos.
* [ ] Creación de pedidos.
* [ ] Historial de pedidos.
* [ ] Seguimiento de pedidos.

### 🚀 Producción

* [ ] Backend.
* [ ] Base de datos.
* [ ] Seguridad.
* [ ] Testing.
* [ ] Despliegue.

---

## 🛠️ Tecnologías

Actualmente el proyecto utiliza:

| Tecnología        | Uso                                         |
| ----------------- | ------------------------------------------- |
| JavaScript        | Lenguaje principal                          |
| React Native      | Desarrollo de la aplicación móvil           |
| Expo              | Plataforma y herramientas de desarrollo     |
| React Navigation  | Navegación implementada                     |
| React Context API | Gestión de estado para filtros y carrito   |
| Git               | Control de versiones                        |
| GitHub            | Repositorio remoto                          |
| MCP               | Herramientas de desarrollo para el proyecto |
| OpenCode          | Asistencia durante el desarrollo            |

### Tecnologías por definir

Todavía no se han seleccionado:

* Backend.
* Base de datos.
* Sistema de autenticación.
* Plataforma de pagos.
* Infraestructura de producción.

> Testing ya está definido: Jest con el preset `jest-expo` y `@testing-library/react-native`. Configuración en `jest.config.js`, `jest.setup.js` y `eslint.config.js`.

Estas decisiones se tomarán cuando lleguemos a las features correspondientes.

---

## 🎨 Identidad visual

AppClotheStore busca transmitir una identidad:

* Premium.
* Urbana.
* Moderna.
* Elegante.
* Minimalista.
* Exclusiva.

La interfaz utiliza principalmente tonos oscuros y neutros, complementados con grises azulados y acentos utilizados de forma moderada.

El sistema visual se encuentra centralizado en:

```text
src/theme/
```

Esto permite mantener una identidad visual consistente en toda la aplicación.

---

## 📁 Estructura del proyecto

```text
AppClotheStore/
│
├── assets/
│   └── Recursos visuales
│
├── appclothe-mcp/
│   └── Servidor MCP del proyecto
│
├── docs/
│   └── Documentación del proyecto
│
├── spec/
│   ├── constitution/
│   │   ├── mission.md
│   │   ├── tech-stack.md
│   │   └── roadmap.md
│   │
│   └── features/
│       └── Features documentadas
│
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   └── theme/
│
├── App.js
├── app.json
├── package.json
├── opencode.json
└── tsconfig.json
```

---

## 📐 Spec-Driven Development

El proyecto utiliza **Spec-Driven Development (SDD)** para organizar el desarrollo.

Antes de modificar el código de una nueva funcionalidad:

```text
Specification
      ↓
     Plan
      ↓
    Tasks
      ↓
Implementation
      ↓
Validation
      ↓
Documentation
```

Cada feature se documenta en:

```text
spec/features/NNN-nombre-feature/
```

con:

```text
spec.md
plan.md
tasks.md
```

La constitución del proyecto se encuentra en:

```text
spec/constitution/
```

y contiene:

* `mission.md` — propósito y límites del proyecto.
* `tech-stack.md` — tecnologías y convenciones.
* `roadmap.md` — orden de desarrollo de las funcionalidades.

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/Alejohgherrera/AppClotheStore.git
```

Entra al proyecto:

```bash
cd AppClotheStore
```

Instala las dependencias:

```bash
npm install
```

---

## ▶️ Ejecutar el proyecto

Inicia Expo:

```bash
npx expo start
```

Para ejecutar directamente en Android:

```bash
npx expo start --android
```

También puedes utilizar **Expo Go** para probar la aplicación durante el desarrollo.

Para ejecutar las pruebas y el linter:

```bash
npm test
npm run lint
```

---

## 📋 Estado actual

**Fase actual: Catálogo — Fase 2**

La aplicación se encuentra en una etapa de desarrollo con las siguientes características implementadas:

* Configuración inicial del proyecto.
* Constitución del proyecto.
* Misión.
* Tech Stack.
* Roadmap.
* Metodología SDD.
* Sistema visual / Theme.
* Repositorio Git.
* Repositorio remoto en GitHub.
* Navegación inicial con React Navigation.
* Modelo local de productos con tallas, colores y disponibilidad.
* Catálogo con navegación por género → categoría → lista de productos.
* Filtros avanzados (precio, tallas, colores, disponibilidad, ordenamiento).
* Búsqueda en tiempo real con normalización de texto (insensible a mayúsculas y acentos).
* Persistencia de filtros en AsyncStorage.
* Diseño visual premium con tokens centralizados en `src/theme/`.

Las funcionalidades de comercio electrónico todavía se encuentran en desarrollo.

---

## 🗺️ Roadmap

El roadmap completo se encuentra en:

```text
spec/constitution/roadmap.md
```

Las principales fases son:

1. **Fundamentos**
2. **Catálogo**
3. **Experiencia de compra**
4. **Usuarios**
5. **Pedidos y pagos**
6. **Producción**
7. **Funcionalidades avanzadas**

---

## 🔒 Seguridad

Nunca se deben almacenar en el repositorio:

* API Keys.
* Contraseñas.
* Tokens.
* Credenciales.
* Variables de entorno sensibles.
* Información privada de usuarios.

Las credenciales y configuraciones sensibles deberán manejarse mediante variables de entorno y mecanismos seguros cuando sean necesarios.

---

## 📚 Documentación

La documentación del proyecto se encuentra principalmente en:

```text
spec/
docs/
```

La especificación de cada funcionalidad debe mantenerse actualizada conforme evoluciona el proyecto.

---

## 👨‍💻 Autor

**Luis Alejandro Herrera**

Software Engineer · Full-Stack Developer · AI Solutions · Digital Marketing · Freelancer

---

## 📄 Licencia

La licencia del proyecto será definida posteriormente.
