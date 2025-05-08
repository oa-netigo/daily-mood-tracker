# Daily Mood Tracker

A modern Vue 3 application that helps users track their daily moods. Built with Vue 3, Vite, and TailwindCSS for a beautiful and responsive user interface.

## Features

- Select your mood from a predefined list (happy, sad, neutral, excited, tired)
- Add optional notes about your day
- View your mood history in chronological order
- Clean and intuitive user interface built with TailwindCSS
- Responsive design that works on all devices
- Modern development setup with Vite

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next generation frontend tooling
- **TailwindCSS**: Utility-first CSS framework
- **Flowbite**: TailwindCSS component library
- **ESLint & Prettier**: Code quality and formatting

## Project Structure

```
src/
  ├── App.vue          # Main application component
  ├── main.js          # Application entry point
  ├── assets/          # Static assets
  ├── components/      # Reusable components
  │   ├── AppHeader.vue    # Application header
  │   ├── MoodEntry.vue    # Individual mood entry component
  │   ├── MoodForm.vue     # Form for adding new moods
  │   └── MoodHistory.vue  # Display mood history
  └── composables/     # Reusable composition functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

### Development

Run the development server:

```sh
npm run dev
```

### Building for Production

Create a production build:

```sh
npm run build
```

### Code Quality

Format your code:

```sh
npm run format
```

Lint your code:

```sh
npm run lint
```

## Vue.js Concepts Demonstrated

- **Component Architecture**: Modular components for better organization
- **Data Management**: Using `data()` and composition API
- **Directives**:
  - `v-model`: Two-way data binding
  - `v-if`: Conditional rendering
  - `v-for`: List rendering
  - `:disabled`: Dynamic attribute binding
- **Methods**: Custom functions for handling user interactions
- **Event Handling**: Using `@click` for button interactions
- **Computed Properties**: For derived state
- **Composition API**: Using composables for reusable logic

## Contributing

Feel free to fork this project and add your own features! Some ideas:

- Add more mood options
- Implement data persistence with localStorage or a backend
- Add mood statistics and charts
- Create a dark mode theme
- Add user authentication
- Implement data export functionality

## License

This project is open source and available under the MIT License.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
