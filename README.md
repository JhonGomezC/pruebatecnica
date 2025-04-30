# 🚀 Prueba Técnica Desarrollador Junior - React / Next.js

Este proyecto, **pruebatecnica** (`v0.1.0`), fue creado con [Next.js](https://nextjs.org) mediante [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). A continuación se muestran los detalles del stack, estructura del código y cómo ejecutarlo localmente.

---

## 🛠️ Tecnologías y Librerías Principales

- **Next.js 15.3.1** con **Turbopack** para desarrollo más rápido.
- **React 19** para la construcción de interfaces reactivas.
- **TypeScript 5** para tipado estático y desarrollo más seguro.
- **Zustand** para la gestión de estado global.
- **React Hook Form** y **Zod** para formularios con validación.
- **@radix-ui/react-***: Librerías de accesibilidad para Dialog, Select, Dropdown Menu, Scroll Area, Separator, Label, Slot.
- **@shadcn/ui**: Conjunto de componentes UI listos para usar.
- **Lucide React**: Iconos personalizables.
- **next-themes**: Soporte para temas claro/oscuro.
- **Sonner**: Sistema de notificaciones elegante y accesible.
- Utilidades varias:
  - **clsx** y **class-variance-authority** para manejo de clases condicionales.
  - **tailwind-merge**, **tailwindcss-animate**, **tw-animate-css** para mejorar estilos y animaciones.
  - **lodash.merge** para fusión de objetos complejos.

---

## ⚙️ Instalación y Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JhonGomezC/pruebatecnica.git
   cd pruebatecnica

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

```pruebatecnica/
├─ app/                       # Enrutamiento con App Router
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ ui/                     # Componentes UI basados en shadcn y radix
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
├─ lib/                       # Funciones especializadas
├─ store.ts                   # Configuración de Zustand
├─ types.ts                   # Tipos globales de TypeScript
├─ utils.ts                   # Utilidades generales
├─ public/                    # Archivos estáticos
├─ .gitignore
├─ next.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
└─ package.json

```

---

## 📚 Recursos de Aprendizaje

- 📘 [Documentación oficial de Next.js](https://nextjs.org/docs)
- 🛠 [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js)

---

## ☁️ Despliegue

El método más sencillo y utilizado es mediante [VPS](http://85.239.238.108:3002/).


---

## 🧾 Licencia

Este proyecto está disponible bajo la [licencia MIT](./LICENSE).

---

## ✍️ Autor

**Jhon Gomez C**  
[GitHub](https://github.com/JhonGomezC)
