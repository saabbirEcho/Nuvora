# Nuvora

A custom Shopify theme built with Liquid, SCSS, and JavaScript.

## Overview

This is a custom Shopify theme featuring a modern, modular architecture with:

- Hero slider with Swiper.js
- Featured collections
- Product pages with variant selector
- Cart modal functionality
- Customer account pages
- Search functionality
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Shopify CLI](https://shopify.dev/themes/tools/cli) (v3.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Nuvora
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Authenticate with Shopify (if not already done):
   ```bash
   # First logout from other stores if needed
   shopify auth logout
   
   # Then start development (this will prompt for authentication if needed)
   shopify theme dev
   # or
   npm start
   ```

## Development

### Starting the Development Server

To start the Shopify theme development server:

```bash
npm start
```

This will:
- Start the Shopify theme dev server
- Connect to `<store-handle>.myshopify.com`
- Enable hot reloading for theme changes

### SCSS Compilation

The theme uses SCSS with a modular structure. You have two options for compiling styles:

**Development mode** (with source maps, watch mode):
```bash
npm run sass:dev
```
This command runs in watch mode, automatically recompiling when SCSS files change.

**Production build** (minified, no source maps, one-time compilation):
```bash
npm run sass:build
```
Use this command for a one-time compilation before deployment to ensure minified CSS.

### Recommended Workflow

For the best development experience, run both commands in separate terminals:

1. Terminal 1 - Shopify theme server:
   ```bash
   npm start
   ```

2. Terminal 2 - SCSS compiler:
   ```bash
   npm run sass:dev
   ```

## Project Structure

```
Nuvora/
├── assets/                  # Compiled CSS and JavaScript files
├── config/                  # Theme configuration files
├── layout/                  # Theme layout templates
├── locales/                 # Translation files
├── sections/                # Reusable theme sections
├── snippets/                # Reusable code snippets
├── src/                     # Source files
│   └── scss/                # SCSS source files
│       ├── 01-config/       # Variables, mixins, configuration
│       ├── 02-base/         # Base styles, reset, typography
│       ├── 03-components/   # Component styles
│       ├── 04-plugins/      # Third-party plugin styles
│       └── 05-utils/        # Utility classes
└── templates/               # Page templates
```

## Available Scripts

- `npm start` - Start the Shopify theme development server
- `npm run sass:dev` - Compile SCSS with source maps (watch mode, for development)
- `npm run sass:build` - One-time compilation of SCSS minified without source maps (for deployment)

## Technologies Used

- **Shopify Liquid** - Template language
- **SCSS** - CSS preprocessor with modular architecture
- **JavaScript** - Vanilla JS for interactivity
- **Swiper.js** - Hero slider functionality
- **Alpine.js** - Lightweight JavaScript framework

## Theme Features

- Custom header and footer sections
- Hero slider with collection showcase
- Featured collection display
- Product pages with variant selector
- Shopping cart modal
- Customer account pages (login, register, orders, addresses)
- Search functionality
- Blog and article templates
- 404 error page
- Responsive design

## Notes

- The compiled CSS file (`assets/bundle.css`) is generated from SCSS source files
- Source files in the `src/` directory are ignored by Shopify (see `.shopifyignore`)
- Always run `npm run sass:build` before deploying to production to ensure minified CSS
- Source maps (`.map` files) are excluded from version control and Shopify uploads
- Make sure to test changes in the development environment before deploying
