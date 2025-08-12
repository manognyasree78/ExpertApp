# Overview

This is the **Ottobon expertApp**, an expert-only platform that allows qualified professionals to contribute knowledge and participate in an AI-powered consulting ecosystem. The application is a full-stack web platform built with React frontend and Express backend, designed to onboard experts, manage their knowledge contributions, and track their performance through a comprehensive portal system.

The platform follows a structured workflow: Landing page → Authentication → Onboarding → Expert Portal, where each expert goes through approval processes and can contribute knowledge that powers AI agents for client consultations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing with nested routes for the portal section
- **State Management**: React Context API for authentication and application state, with localStorage persistence for offline state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both dark (landing) and light (portal) themes
- **Forms**: React Hook Form with Zod validation for type-safe form handling and validation
- **Data Fetching**: TanStack Query for server state management and caching

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Development**: Vite for fast development builds and HMR (Hot Module Replacement)
- **Production Build**: ESBuild for optimized server bundling
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations

## Data Storage Solutions
- **Database**: PostgreSQL as primary database with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL for cloud database hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: Connect-pg-simple for PostgreSQL-backed session storage
- **Local Storage**: Browser localStorage for client-side state persistence

## Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL session store
- **Client-side State**: React Context for authentication state management
- **Route Protection**: Custom guards checking authentication and approval status
- **Multi-stage Onboarding**: Progressive authentication through login → onboarding → approval flow

## External Dependencies

### UI and Design System
- **Radix UI**: Complete set of accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: For component variant management
- **Date-fns**: Date utility library for time formatting

### Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking and enhanced IDE support
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Database and ORM
- **Drizzle ORM**: Type-safe PostgreSQL ORM with automatic type generation
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

### Utilities and Enhancements
- **Clsx & Tailwind Merge**: Utility classes combination and conflict resolution
- **Nanoid**: Unique ID generation for various application needs
- **Embla Carousel**: Carousel/slider component for UI elements
- **CMDK**: Command palette component for enhanced user experience

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Runtime Error Overlay**: Enhanced error reporting during development
- **Cartographer**: Replit-specific development tooling integration