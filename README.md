# 🌟 Portafolio Personal

Un portafolio web moderno y responsivo construido con Next.js, TypeScript y Tailwind CSS.

![Portafolio Preview](./public/images/preview.png)

## ✨ Características

- **🎨 Diseño Moderno**: Interfaz limpia y profesional con modo oscuro
- **📱 Totalmente Responsivo**: Optimizado para todos los dispositivos
- **⚡ Rendimiento Optimizado**: Carga rápida con Next.js y optimizaciones
- **🔍 SEO Optimizado**: Meta tags y sitemap para mejor posicionamiento
- **📝 Blog Integrado**: Sistema de blog con Markdown
- **💼 Proyectos**: Showcase de proyectos con galería
- **📧 Formulario de Contacto**: Formulario funcional con validación
- **🌙 Modo Oscuro**: Alternancia entre tema claro y oscuro
- **♿ Accesible**: Cumple con estándares de accesibilidad
- **🎯 TypeScript**: Tipado estático para mejor desarrollo

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS, CSS Modules
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Markdown**: Gray Matter, Remark
- **Email**: Nodemailer
- **Linting**: ESLint, Prettier
- **Análisis**: Bundle Analyzer

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/portafolio-web.git
   cd portafolio-web
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con tus valores.

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. **Abre tu navegador**
   Navega a [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AboutCard.tsx   # Tarjeta de información personal
│   ├── BlogCard.tsx    # Tarjeta de artículo del blog
│   ├── ContactForm.tsx # Formulario de contacto
│   ├── Footer.tsx      # Pie de página
│   ├── HeroSection.tsx # Sección principal
│   ├── Layout.tsx      # Layout principal
│   ├── Navbar.tsx      # Barra de navegación
│   ├── ProjectCard.tsx # Tarjeta de proyecto
│   ├── SEOHead.tsx     # Meta tags SEO
│   └── SkillBadge.tsx  # Badge de habilidades
├── pages/              # Páginas de Next.js
│   ├── about.tsx       # Página sobre mí
│   ├── contact.tsx     # Página de contacto
│   ├── index.tsx       # Página principal
│   ├── projects.tsx    # Página de proyectos
│   └── skills.tsx      # Página de habilidades
├── blog/               # Sistema de blog
│   ├── [slug].tsx      # Página de artículo individual
│   ├── index.tsx       # Lista de artículos
│   └── 404.tsx         # Página de error
├── data/               # Datos del sitio
│   └── posts/          # Artículos en Markdown
├── lib/                # Utilidades y configuraciones
│   ├── email.ts        # Configuración de email
│   ├── markdown.ts     # Procesamiento de Markdown
│   └── posts.ts        # Manejo de artículos
├── hooks/              # Hooks personalizados
├── types/              # Tipos de TypeScript
├── utils/              # Funciones utilitarias
└── styles/             # Estilos globales
```

## ⚙️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run export       # Exportación estática

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run type-check   # Verificar tipos de TypeScript

# Análisis
npm run analyze      # Analizar bundle
npm run clean        # Limpiar archivos de construcción
```

## 🎨 Personalización

### 1. Información Personal
Edita los archivos en `src/utils/constants.ts` para actualizar tu información personal.

### 2. Colores y Tema
Modifica `tailwind.config.js` para personalizar la paleta de colores:

```javascript
colors: {
  primary: {
    // Tus colores primarios
  },
  secondary: {
    // Tus colores secundarios
  }
}
```

### 3. Contenido
- **Proyectos**: Añade tus proyectos en `src/data/projects.ts`
- **Habilidades**: Actualiza `src/data/skills.ts`
- **Blog**: Crea archivos `.md` en `src/data/posts/`

### 4. Imágenes
Coloca tus imágenes en:
- `public/images/` - Imágenes generales
- `public/images/proyectos/` - Imágenes de proyectos
- `public/images/blog/` - Imágenes de artículos

## 📝 Creando Contenido

### Blog Posts
Crea archivos Markdown en `src/data/posts/`:

```markdown
---
title: "Título del Artículo"
date: "2025-01-15"
excerpt: "Descripción breve del artículo"
coverImage: "/images/blog/mi-articulo.jpg"
tags: ["nextjs", "react", "typescript"]
---

# Contenido del artículo

Tu contenido aquí...
```

### Proyectos
Añade proyectos en el archivo correspondiente:

```typescript
{
  id: 'mi-proyecto',
  title: 'Mi Proyecto',
  description: 'Descripción del proyecto',
  image: '/images/proyectos/mi-proyecto.jpg',
  technologies: ['Next.js', 'TypeScript'],
  githubUrl: 'https://github.com/usuario/proyecto',
  liveUrl: 'https://mi-proyecto.com'
}
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. ¡Despliega automáticamente!

### Netlify
1. Ejecuta `npm run build && npm run export`
2. Sube la carpeta `out/` a Netlify

### GitHub Pages
1. Configura GitHub Pages en tu repositorio
2. Usa GitHub Actions para automatizar el despliegue

## 🔧 Configuración Avanzada

### Variables de Entorno
Consulta `.env.example` para todas las variables disponibles.

### Optimizaciones de SEO
- Sitemap automático en `/sitemap.xml`
- Robots.txt en `/robots.txt`
- Meta tags optimizados
- Schema.org markup

### Análisis de Performance
```bash
npm run analyze
```

## 📊 Métricas y Analytics

- **Core Web Vitals**: Optimizado para LCP, FID, CLS
- **Lighthouse Score**: 90+ en todas las categorías
- **Bundle Size**: Optimizado con code splitting

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework de React
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Lucide](https://lucide.dev/) - Iconos
- [Framer Motion](https://www.framer.com/motion/) - Animaciones

## 📞 Contacto

- **Email**: tu-email@ejemplo.com
- **LinkedIn**: [tu-perfil](https://linkedin.com/in/tu-perfil)
- **GitHub**: [tu-usuario](https://github.com/tu-usuario)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!