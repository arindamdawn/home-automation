# Home Automation Configuration System

A modern web application built with React and TypeScript that helps users configure their smart home automation setup. The system provides an intuitive interface for configuring rooms with various sensors and devices, calculating costs, and generating a detailed summary.

## Features

- 🏠 Room-wise configuration of smart home devices and sensors
- 💡 Support for various sensors including motion detection, human presence, light intensity, and air quality
- 🎛️ Smart device controls including LED dimmers and switch modules
- 💰 Real-time cost calculation and budget tracking
- 📱 Responsive design that works on all devices
- 🎨 Modern UI with a clean, professional look

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn UI for component library
- Framer Motion for animations

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/arindamdawn/home-automation.git
cd home-automation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint for code linting

## Project Structure

```
src/
  ├── components/     # React components
  ├── lib/            # Utility functions and helpers
  ├── stories/        # Storybook component stories
  ├── types/          # TypeScript type definitions
  └── App.tsx         # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
