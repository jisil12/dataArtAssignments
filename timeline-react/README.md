# Timeline App - React Version

A modern, interactive timeline application built with React, TypeScript, and Vite. Explore historical events through beautiful visual cards with detailed information.

## Features

- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Component-Based Design**: Modular components for maintainability
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Interactive Timeline**: Click on events to view detailed information
- **Category Filtering**: Filter events by category (History, Politics, Exploration, Science, Technology)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## Components

- **Header**: Logo and theme toggle functionality
- **Timeline**: Grid layout displaying all timeline events
- **EventMarker**: Individual event cards with hover effects
- **EventModal**: Detailed view using React Portal
- **FilterPanel**: Category filtering and event count display

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **CSS Variables**: Dynamic theming system
- **React Portal**: Modal implementation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timeline-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Header with logo and theme toggle
│   ├── Timeline.tsx    # Main timeline grid
│   ├── EventMarker.tsx # Individual event cards
│   ├── EventModal.tsx  # Modal for detailed view
│   ├── FilterPanel.tsx # Category filtering
│   └── *.css          # Component-specific styles
├── types.ts            # TypeScript type definitions
├── data.ts             # Timeline event data
├── App.tsx             # Main application component
├── App.css             # Global styles and theme variables
├── index.css           # Base styles and reset
└── main.tsx            # Application entry point
```

## State Management

The application uses React hooks for state management:

- `useState` for local component state
- `useEffect` for side effects and data filtering
- Props for component communication

## Styling

- **CSS Variables**: Dynamic theming with light/dark mode support
- **Responsive Design**: Mobile-first approach with CSS Grid
- **Smooth Animations**: CSS transitions and transforms
- **Modern UI**: Clean, accessible design with hover effects

## Data Structure

Events are defined with the following TypeScript interface:

```typescript
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  imageURL: string;
  category: EventCategory;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Historical event data and descriptions
- React and Vite communities
- Modern web development best practices
