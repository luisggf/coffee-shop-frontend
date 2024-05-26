# Coffee Shop Frontend

This project is the frontend for a coffee shop application, built using modern web development technologies such as Vite, TypeScript, Radix UI, Sonner, Axios, and more. This README will guide you through the setup process, explaining the dependencies and how to run the code.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Technologies Used

- **Vite**: A fast build tool and development server.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Radix UI**: A set of accessible and customizable UI components.
  - **@radix-ui/react-dialog**
  - **@radix-ui/react-dropdown-menu**
  - **@radix-ui/react-icons**
- **Sonner**: A toast notification library.
- **Axios**: A promise-based HTTP client for making requests.
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework.

## Installation

Before running the application, ensure you have Node.js and npm (or yarn) installed. Then, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/coffee-shop-front.git
   cd coffee-shop-front
   ```

2. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Application

You can run the application in development mode, build it for production, or preview the production build using the following commands:

### Development Mode

To start the development server with hot reloading, run:

```sh
npm run dev
# or
yarn dev
```

### Production Build

To build the application for production, run:

```sh
npm run build
# or
yarn build
```

### Preview Production Build

To preview the production build, run:

```sh
npm run preview
# or
yarn preview
```

## Project Structure

The project structure is as follows:

```
coffee-shop-front/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Scripts

- **dev**: Starts the development server.
- **build**: Compiles TypeScript and builds the project for production.
- **preview**: Previews the production build.

## Dependencies

### Runtime Dependencies

- **@fastify/multipart**: Handling file uploads.
- **@radix-ui/react-dialog**: Accessible dialog component.
- **@radix-ui/react-dropdown-menu**: Accessible dropdown menu component.
- **@radix-ui/react-icons**: Icon set for Radix UI.
- **axios**: HTTP client for making API requests.
- **react**: Library for building user interfaces.
- **react-dom**: Entry point for DOM rendering in React.
- **react-router-dom**: Routing library for React.
- **sonner**: Toast notification library.

### Development Dependencies

- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss**: CSS framework for building custom user interfaces.
- **typescript**: Superset of JavaScript that adds types.
- **vite**: Build tool and development server.

Feel free to explore the code and make any modifications as needed. If you encounter any issues, please open an issue on the repository.

Happy coding!
