# Daily Mood Tracker

A simple Vue 3 application that helps users track their daily moods. This project demonstrates core Vue.js concepts using the Options API.

## Features

- Select your mood from a predefined list (happy, sad, neutral, excited, tired)
- Add optional notes about your day
- View your mood history in chronological order
- Clean and intuitive user interface
- Responsive design

## Vue.js Concepts Demonstrated

- **Data Management**: Using `data()` to manage application state
- **Directives**:
  - `v-model`: Two-way data binding for form inputs
  - `v-if`: Conditional rendering
  - `v-for`: List rendering
  - `:disabled`: Dynamic attribute binding
- **Methods**: Custom functions for handling user interactions
- **Event Handling**: Using `@click` for button interactions
- **Computed Properties**: (Can be added for more complex data transformations)

## Project Structure

```
src/
  ├── App.vue          # Main application component
  ├── main.js          # Application entry point
  ├── assets/          # Static assets
  └── components/      # Reusable components
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

## Learning Resources

This project is designed to help beginners understand Vue.js concepts. Here are some key concepts demonstrated:

1. **Data Binding**: See how `v-model` connects form inputs to data
2. **Conditional Rendering**: Learn how `v-if` and `v-else` work
3. **List Rendering**: Understand how `v-for` creates dynamic lists
4. **Event Handling**: See how methods respond to user interactions
5. **Component Structure**: Learn about Vue's single-file component structure

## Contributing

Feel free to fork this project and add your own features! Some ideas:

- Add more mood options
- Implement data persistence
- Add mood statistics and charts
- Create a dark mode theme

## License

This project is open source and available under the MIT License.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
