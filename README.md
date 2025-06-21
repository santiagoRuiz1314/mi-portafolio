# Santiago Ruiz - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project showcases my skills as a Full Stack Developer and serves as a comprehensive platform to display my projects, technical expertise, and professional journey.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

## Features

- **Responsive Design**: Mobile-first approach with seamless adaptation across all devices
- **Dark/Light Theme**: Automatic theme detection with manual toggle option
- **Performance Optimized**: Built with Next.js for optimal loading speeds and SEO
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form with Formspree integration
- **SEO Optimized**: Meta tags, structured data, and dynamic sitemap generation
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **TypeScript**: Full type safety for better development experience
- **Analytics Ready**: Built-in analytics integration support
- **Multilingual Support**: Ready for English/Spanish localization

## Tech Stack

### Core Technologies
- **[Next.js 14.2.5](https://nextjs.org/)** - React framework for production
- **[React 18.3.1](https://reactjs.org/)** - UI library for building user interfaces
- **[TypeScript 5.5.4](https://www.typescriptlang.org/)** - Static type checking
- **[Tailwind CSS 3.4.6](https://tailwindcss.com/)** - Utility-first CSS framework

### UI & Styling
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional styling utilities

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[PostCSS](https://postcss.org/)** & **[Autoprefixer](https://autoprefixer.github.io/)** - CSS processing

## Project Structure

```
portfolio-web/
├── public/                     # Static assets
│   ├── images/                # Images and media files
│   ├── favicon.ico            # Site favicon
│   ├── robots.txt             # Search engine directives
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── components/            # Reusable React components
│   │   ├── AboutCard.tsx      # Personal information display
│   │   ├── ContactForm.tsx    # Contact form with validation
│   │   ├── Footer.tsx         # Site footer component
│   │   ├── HeroSection.tsx    # Landing page hero section
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── Navbar.tsx         # Navigation header
│   │   ├── ProjectCard.tsx    # Project showcase cards
│   │   ├── ProjectModal.tsx   # Project detail modal
│   │   ├── SEOHead.tsx        # SEO meta tags component
│   │   └── SkillBadge.tsx     # Technology skill badges
│   ├── hooks/                 # Custom React hooks
│   │   └── usePortfolioData.ts # Portfolio data management
│   ├── lib/                   # Utility libraries
│   │   ├── analytics.ts       # Analytics integration
│   │   ├── formspree.ts       # Email service integration
│   │   └── seo.ts            # SEO configuration and helpers
│   ├── pages/                 # Next.js pages and API routes
│   │   ├── api/              # API endpoints
│   │   │   ├── contact.ts    # Contact form handler
│   │   │   └── sitemap.xml.ts # Dynamic sitemap generation
│   │   ├── _app.tsx          # Application wrapper
│   │   ├── _document.tsx     # HTML document structure
│   │   ├── index.tsx         # Homepage
│   │   ├── about.tsx         # About page
│   │   ├── contact.tsx       # Contact page
│   │   ├── projects.tsx      # Projects showcase
│   │   └── skills.tsx        # Skills & technologies
│   ├── styles/
│   │   └── globals.css       # Global styles and Tailwind imports
│   ├── types/
│   │   ├── global.d.ts       # Global TypeScript definitions
│   │   └── portfolio.ts      # Portfolio-specific types
│   └── utils/                # Utility functions and data
│       ├── cn.ts             # Class name utility
│       ├── constants.ts      # Site configuration
│       ├── portfolio-stats.ts # Statistics calculation
│       └── sample-data.ts    # Portfolio data
├── middleware.ts             # Next.js middleware for security
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- **Node.js** 18.17.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/santiagoRuiz1314/mi-portafolio.git
   cd portfolio-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_SITE_NAME="Your Name"
   NEXT_PUBLIC_CONTACT_EMAIL="your@email.com"
   NEXT_PUBLIC_GITHUB_URL="https://github.com/yourusername"
   NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/yourprofile"
   NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
   NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/YOUR_FORM_ID"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Personal Information
Update your personal details in `src/utils/constants.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  author: 'Your Full Name',
  title: 'Your Professional Title',
  description: 'Your professional description',
  // ... other configurations
};
```

### Projects
Add your projects in `src/utils/sample-data.ts`:
```typescript
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'your-project',
    title: 'Project Title',
    description: 'Project description',
    image: '/images/projects/project-image.jpg',
    technologies: ['React', 'TypeScript', 'Next.js'],
    githubUrl: 'https://github.com/username/project',
    liveUrl: 'https://project-demo.com',
    // ... other project details
  }
];
```

### Skills
Update your technical skills in the same file:
```typescript
export const SAMPLE_SKILLS: Skill[] = [
  {
    id: 'skill-id',
    name: 'Skill Name',
    level: 5, // 1-5 proficiency level
    category: 'Frontend', // or Backend, Tools, etc.
    description: 'Skill description',
    projects: ['project-id'] // Projects using this skill
  }
];
```

### Contact Form
To enable the contact form functionality:

1. **Sign up for Formspree** at [formspree.io](https://formspree.io)
2. **Create a new form** and get your endpoint URL
3. **Add the endpoint** to your environment variables:
   ```env
   NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/YOUR_FORM_ID"
   ```

### Styling & Theme
Customize colors and theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks

# Utilities
npm run clean        # Clean build artifacts
```

## Deployment

### Vercel (Recommended)
1. Connect your repository to [Vercel](https://vercel.com)
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Upload the `.next/` folder to Netlify
3. Configure redirects and environment variables

### Traditional Hosting
1. Build the project: `npm run build`
2. Export static files: `npm run export` (if configured)
3. Upload the generated files to your hosting provider

## Features Overview

### Dynamic Portfolio Statistics
The portfolio automatically calculates and displays:
- Number of completed projects
- Technologies used
- Years of experience
- Skills proficiency levels

### SEO & Performance
- Structured data with JSON-LD
- Meta tags optimization
- Sitemap generation
- Performance optimized images
- Accessibility compliance

### Contact System
- Form validation (client-side and server-side)
- Formspree integration for email delivery
- Error handling and user feedback
- Spam protection with honeypot fields

### Theme System
- Automatic dark/light mode detection
- Manual theme toggle
- System preference respect
- Smooth transitions between themes

## Contributing

While this is a personal portfolio, contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add TypeScript types for new components
- Test responsiveness across different screen sizes
- Ensure accessibility standards are maintained
- Update documentation for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Santiago Steven Ruiz Carreño**
- Website: [Portfolio](https://mi-portafolio-khaki-nine.vercel.app)
- Email: santiago06ruiz@gmail.com
- LinkedIn: [santiago-steven-ruiz-carreño](https://linkedin.com/in/santiago-steven-ruiz-carreño-880571369)
- GitHub: [@santiagoRuiz1314](https://github.com/santiagoRuiz1314)
- Location: Bucaramanga, Colombia

## Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - For the beautiful icons
- **[Vercel](https://vercel.com/)** - For hosting and deployment platform
- **[Formspree](https://formspree.io/)** - For contact form handling

## Project Status

- **Core Features**: Complete
- **Responsive Design**: Complete
- **SEO Optimization**: Complete
- **Contact Form**: Complete
- **Dark/Light Theme**: Complete
- **Blog Section**: Planned
- **Internationalization**: In Progress
- **CMS Integration**: Planned

---

<div align="center">
  <p>Built with ❤️ by Santiago Ruiz</p>
  <p>
    <a href="#top">Back to top</a>
  </p>
</div>