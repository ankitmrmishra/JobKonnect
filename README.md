# JobKonnect

[JobKonnect](https://jobkonnect.vercel.app) is a modern job board platform built with Next.js, designed to connect job seekers with employers efficiently and effectively.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with Kinde Auth
- Job posting and application management
- Advanced search and filtering capabilities
- Responsive design for mobile and desktop
- Rich text editing for job descriptions
- Google Maps integration for job locations
- File uploads with UploadThing
- Dark mode support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/jobkonnect.git
   cd jobkonnect
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the necessary environment variables (refer to `.env.example` if available).

4. Set up the database:

   This project uses Prisma as an ORM. Run the following command to set up your database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running on `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Lints the codebase
- `npm run postinstall`: Generates Prisma client
- `npm run vercel-build`: Generates Prisma client and builds the app (used for Vercel deployment)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Kinde Auth](https://kinde.com/) - Authentication and authorization platform
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Recharts](https://recharts.org/) - Charting library built with React components
- [TipTap](https://tiptap.dev/) - Headless rich text editor framework
- [UploadThing](https://uploadthing.com/) - File upload solution

## Project Structure

(Add a brief overview of your project's folder structure here)

## Contributing

We welcome contributions to JobKonnect! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
