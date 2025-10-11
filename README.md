# IntelliCraft Solutions - Freelancing Portfolio

A modern, responsive portfolio website built with Next.js 14, featuring a premium dark theme, 3D animations, and a professional showcase of web development services.

## 🚀 Features

- **Modern Design**: Clean, professional interface with premium dark theme
- **3D Animations**: Interactive 3D robot using Spline and Three.js
- **Responsive Layout**: Fully responsive design that works on all devices
- **Theme Support**: Dark/Light mode toggle with optimized styling
- **Performance Optimized**: Built with Next.js 14 for optimal performance
- **TypeScript**: Full TypeScript support for better development experience
- **Component Library**: Built with Radix UI and shadcn/ui components
- **Analytics**: Integrated with Vercel Analytics

## 📁 Project Structure

```
freelancing-portfolio_v5/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles and theme variables
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── splite.tsx           # Spline 3D component
│   │   └── ...                  # Other UI components
│   ├── animated-background.tsx  # Animated background component
│   ├── contact-section.tsx      # Contact form section
│   ├── footer.tsx               # Footer component
│   ├── header.tsx               # Navigation header
│   ├── hero-section.tsx         # Hero section with 3D robot
│   ├── products-section.tsx     # Products showcase
│   ├── services-section.tsx     # Services section
│   ├── stats-section.tsx        # Statistics section
│   ├── testimonials-section.tsx # Customer testimonials
│   └── theme-provider.tsx       # Theme context provider
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
│   ├── logo.png
│   ├── professional-*.png       # Team member images
│   └── *.jpg                    # Project showcase images
├── styles/                      # Additional styles
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI + shadcn/ui
- **3D Graphics**: Spline + Three.js + React Three Fiber
- **Icons**: Lucide React
- **Fonts**: Geist Sans, Geist Mono, Playwrite US Modern
- **Analytics**: Vercel Analytics
- **Package Manager**: npm/pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (or pnpm/yarn)
- **Git**: For version control

### Check your versions:
```bash
node --version    # Should be 18.0+
npm --version     # Should be 9.0+
git --version
```

## 🚀 Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd freelancing-portfolio_v5
```

### Step 2: Install Dependencies

Choose one of the following package managers:

#### Option A: Using npm (Recommended)
```bash
npm install
```

#### Option B: Using pnpm
```bash
pnpm install
```

#### Option C: Using yarn
```bash
yarn install
```

### Step 3: Environment Setup

The project doesn't require any environment variables for basic functionality. However, if you need to add any:

1. Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

2. Add any required environment variables (currently none needed)

### Step 4: Run the Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

The application will be available at: `http://localhost:3000`

### Step 5: Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 🎨 Customization

### Adding New Components

1. Create your component in the `components/` directory
2. Import and use it in your pages
3. Follow the existing component patterns for consistency

### Modifying Styles

- **Global styles**: Edit `app/globals.css`
- **Component styles**: Use Tailwind classes or create custom CSS
- **Theme variables**: Modify CSS custom properties in `globals.css`

### Updating Content

- **Hero section**: Edit `components/hero-section.tsx`
- **Services**: Modify `components/services-section.tsx`
- **Products**: Update `components/products-section.tsx`
- **Contact**: Customize `components/contact-section.tsx`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Package management
npm install          # Install dependencies
npm update           # Update dependencies
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🎭 Theme System

The project includes a sophisticated theme system:

- **Dark Mode**: Default theme with premium styling
- **Light Mode**: Optimized light theme
- **Automatic switching**: Based on system preferences
- **Manual toggle**: Theme switcher in the header

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling
- Keep components small and focused

### File Naming
- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for function and variable names

### Git Workflow
- Create feature branches for new features
- Write descriptive commit messages
- Keep commits atomic and focused

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

#### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Issues
- Ensure you're using the latest Node.js version
- Clear browser cache
- Check for memory leaks in development tools

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is private and proprietary. All rights reserved.

## 🎯 Project Goals

This portfolio showcases:
- **E-commerce Solutions**: Modern online stores
- **Finance Management**: Billing and payment systems
- **AI Agent Solutions**: Automated workflow systems
- **Web Development**: Full-stack applications

---

**Built with ❤️ by IntelliCraft Solutions**

*Ready to deploy in hours, not months.*
