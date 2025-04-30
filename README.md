# 🚀 Prueba Técnica Desarrollador Junior - React / Next.js

Este proyecto, **pruebatecnica** (`v0.1.0`), fue creado con [Next.js](https://nextjs.org) mediante [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). A continuación se muestran detalles y cómo iniciar:

---

## 🛠️ Tecnologías y Librerías Principales

- **Next.js 15.3.1** con **Turbopack** para un desarrollo ultrarrápido.
- **React 19** para la construcción de interfaces.
- **TypeScript 5** para tipado estático.
- Gestión de estados: **Zustand**.
- Formularios: **React Hook Form** y **Zod** para validación.
- UI:
  - **@radix-ui/react-*** (Dialog, Select, Dropdown Menu, Scroll Area, Separator, Label, Slot)
  - **@shadcn/ui** componentes básicos.
  - **Lucide React** iconos.
- Theming: **next-themes**.
- Notificaciones: **Sonner**.
- Utilidades:
  - **class-variance-authority** y **clsx** para clases condicionales.
  - **tailwind-merge**, **tw-animate-css**, **tailwindcss-animate** para estilos.

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/JhonGomezC/PruebaTecnicaDesarrolladorJuniorReact-Next.git
   cd PruebaTecnicaDesarrolladorJuniorReact-Next
   ```

2. Instalar dependencias:

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. Ejecutar en modo desarrollo (con Turbopack):

   ```bash
   npm run dev      # alias de "next dev --turbopack"
   yarn dev
   pnpm dev
   bun dev
   ```

4. Abrir en el navegador:

   Ve a [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts disponibles

| Script       | Comando                     | Descripción                                |
|--------------|-----------------------------|--------------------------------------------|
| `dev`        | `next dev --turbopack`      | Inicia servidor en modo desarrollo         |
| `build`      | `next build`                | Genera versión optimizada para producción  |
| `start`      | `next start`                | Inicia la app en producción                |
| `lint`       | `next lint`                 | Revisa estilo y posibles errores de código |

---

## 📁 Estructura del Proyecto

```
pruebatecnica/
├─ .next/                     # Archivos generados por Next.js
├─ app/                       # Rutas y archivos del App Router
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/                # Componentes reutilizables
│  ├─ ui/                     # Biblioteca de componentes UI (Radix, shadcn)
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  ├─ card.tsx
│  │  ├─ dialog.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ form.tsx
│  │  ├─ input.tsx
│  │  ├─ label.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ slot.tsx
│  │  ├─ table.tsx
│  │  └─ textarea.tsx
│  ├─ image-upload.tsx
│  ├─ mode-toggle.tsx
│  ├─ product-dashboard.tsx
│  ├─ product-form.tsx
│  ├─ product-list.tsx
│  ├─ product-preview.tsx
│  └─ theme-provider.tsx
├─ lib/                       # Funciones y utilidades especializadas
├─ store.ts                   # Configuración de Zustand para state global
├─ types.ts                   # Definición de tipos TypeScript
├─ utils.ts                   # Funciones utilitarias generales
├─ public/                    # Archivos estáticos (imágenes, fuentes)
├─ node_modules/              # Dependencias instaladas
├─ .gitignore                 # Archivos y carpetas ignorados por Git
├─ next.config.ts             # Configuración de Next.js personalizada
├─ tailwind.config.js         # Configuración de Tailwind CSS
├─ postcss.config.js          # Configuración de PostCSS
├─ tsconfig.json              # Configuración de TypeScript
└─ package.json               # Scripts y dependencias

```

---

## 📚 Recursos de Aprendizaje

- 📘 [Documentación oficial de Next.js](https://nextjs.org/docs)
- 🧪 [Tutorial interactivo](https://nextjs.org/learn)
- 🛠 [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)

---

## ☁️ Despliegue

El método más sencillo es mediante [VPS](http://85.239.238.108:3002/).

Para otras alternativas, revisa la [guía de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🧾 Licencia

Este proyecto está disponible bajo la [licencia MIT](./LICENSE).

---

## ✍️ Autor

**Jhon Gomez C**  
[GitHub](https://github.com/JhonGomezC)
