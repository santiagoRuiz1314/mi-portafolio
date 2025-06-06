# 🚀 Configuración del Portafolio

Esta guía te ayudará a configurar y ejecutar tu portafolio personal correctamente.

## 📋 Requisitos previos

- Node.js 18+ 
- npm 8+ (o yarn/pnpm)
- Git

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/portafolio-web.git
   cd portafolio-web
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tu información:
   ```bash
   NEXT_PUBLIC_SITE_NAME="Tu Nombre"
   NEXT_PUBLIC_CONTACT_EMAIL="tu@email.com"
   NEXT_PUBLIC_GITHUB_URL="https://github.com/tu-usuario"
   # ... resto de configuraciones
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   Ve a [http://localhost:3000](http://localhost:3000)

## 🎨 Personalización

### 1. Información personal
Edita `src/utils/constants.ts` para actualizar:
- Nombre y título profesional
- Información de contacto
- Biografía y experiencia
- Redes sociales

### 2. Proyectos
Actualiza `src/utils/sample-data.ts` en la sección `SAMPLE_PROJECTS`:
```typescript
{
  id: 'mi-proyecto',
  title: 'Mi Proyecto Increíble',
  description: 'Descripción del proyecto...',
  image: '/images/proyectos/mi-proyecto.jpg',
  technologies: ['React', 'Next.js', 'TypeScript'],
  // ...
}
```

### 3. Habilidades
Modifica `SAMPLE_SKILLS` en el mismo archivo:
```typescript
{
  id: 'react',
  name: 'React',
  level: 5, // 1-5
  category: 'Frontend',
  icon: '⚛️',
  // ...
}
```

### 4. Imágenes
Coloca tus imágenes en:
- `public/images/foto-perfil.jpg` - Tu foto de perfil
- `public/images/proyectos/` - Capturas de tus proyectos
- `public/images/blog/` - Imágenes para artículos
- `public/favicon.ico` - Tu favicon

### 5. Colores y tema
Edita `tailwind.config.js` para cambiar la paleta de colores:
```javascript
colors: {
  primary: {
    // Tus colores primarios
    500: '#3b82f6', // Azul por defecto
  }
}
```

## 📝 Creando contenido

### Blog posts
Crea archivos `.md` en `src/data/posts/`:
```markdown
---
title: "Mi artículo"
date: "2025-01-15"
excerpt: "Descripción breve..."
tags: ["react", "tutorial"]
featured: true
published: true
---

# Contenido del artículo...
```

### Nuevos proyectos
1. Añade el proyecto a `SAMPLE_PROJECTS`
2. Añade las imágenes correspondientes
3. El proyecto aparecerá automáticamente

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Deploy automático en cada push

### Netlify
1. Ejecuta `npm run build && npm run export`
2. Sube la carpeta `out/` a Netlify

### GitHub Pages
1. Habilita GitHub Pages en tu repositorio
2. Configura GitHub Actions para deploy automático

## 📧 Configuración del formulario de contacto

Para que el formulario funcione, configura las variables de email en `.env.local`:

```bash
# Gmail (recomendado)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-app-password"  # Contraseña de aplicación, no tu contraseña normal
```

**Nota**: Para Gmail, necesitas generar una "contraseña de aplicación" en tu cuenta de Google.

## 🎯 Optimizaciones recomendadas

### SEO
- Actualiza `src/lib/seo.ts` con tu información
- Añade Google Analytics en las variables de entorno
- Genera un sitemap actualizado

### Performance
- Optimiza imágenes (usa WebP cuando sea posible)
- Las imágenes grandes deberían ser máximo 1920px de ancho
- Comprime imágenes antes de subirlas

### Accesibilidad
- Añade texto alternativo a todas las imágenes
- Usa colores con suficiente contraste
- Prueba la navegación con teclado

## 🐛 Problemas comunes

### Error de módulos no encontrados
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Problemas con Tailwind CSS
```bash
# Verifica que tailwind.config.js esté correctamente configurado
npm run build
```

### Imágenes no cargan
- Verifica que las rutas sean correctas (comienzan con `/`)
- Asegúrate de que las imágenes estén en `public/`

### Formulario de contacto no funciona
- Verifica las variables de entorno de email
- Revisa la consola del navegador para errores
- Prueba primero en desarrollo local

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que las variables de entorno estén configuradas
4. Revisa que las imágenes existan en las rutas especificadas

## 🎉 ¡Listo!

Tu portafolio debería estar funcionando. Personalízalo con tu información y proyectos, y tendrás un sitio web profesional en pocos minutos.

### Próximos pasos
- [ ] Personalizar información personal
- [ ] Añadir tus proyectos reales
- [ ] Configurar analytics
- [ ] Optimizar SEO
- [ ] Desplegar a producción

¡Buena suerte con tu nuevo portafolio! 🚀