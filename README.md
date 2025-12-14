# DesiA11y - Compliance Scanner

A powerful ADA/WCAG accessibility scanner built for Indian teams. Identifies issues on any website and generates detailed audit reports with RPWD Act, IS 17802, and GIGW context. Built for agencies, developers, and businesses that need fast, accurate compliance insights.

## Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Custom primary color: #2596BE
- Inter font family
- Responsive header component with mobile menu

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with Inter font
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles with Tailwind
├── components/
│   └── Header.tsx      # Header component with navigation
├── tailwind.config.ts  # Tailwind configuration with custom colors
└── package.json        # Dependencies
```

## Customization

The primary color (#2596BE) is configured in `tailwind.config.ts` and can be used throughout the project with the `primary` class (e.g., `bg-primary`, `text-primary`).

## Build for Production

```bash
npm run build
npm start
```

