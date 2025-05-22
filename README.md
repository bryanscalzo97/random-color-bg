# Random Color Background App

A React Native application that generates random background colors with an enhanced user experience. Built with Expo and React Native.

## Features

- **Random Color Generation**: Tap anywhere on the screen to change the background color
- **Smart Contrast**: Text and UI elements automatically adjust their color for optimal readability
- **Relax Mode**: Automatic color changes every 5 seconds with a progress indicator
- **Color Feedback**:
  - Visual feedback with emojis that change based on color temperature
  - Audio feedback with different sounds for warm, cold, and neutral colors
  - Haptic feedback when changing colors
- **Color Copy**: Copy the current color to clipboard with a single tap
- **Responsive Design**: Works on iOS, Android and Web

## Web Version

The application is deployed and available for testing at [https://random-color-a1wxtecjo-bryanscalzo97s-projects.vercel.app](https://random-color-a1wxtecjo-bryanscalzo97s-projects.vercel.app). Simply log in to access the web version and test all features directly in your browser.

## Technical Features

- Built with React Native and Expo
- Custom hooks for color management and audio
- Efficient state management
- Clean and modular code structure
- No external color generation libraries

## Project Structure

```
app/
├── components/         # Reusable UI components
│   ├── ColorDisplay.tsx
│   ├── ProgressBar.tsx
│   └── RelaxModeSwitch.tsx
├── hooks/             # Custom hooks
│   ├── useAudio.ts
│   ├── useClipboard.ts
│   ├── useColorManager.ts
│   └── useRelaxMode.ts
├── utils/             # Utility functions
│   └── colorUtils.ts
└── index.tsx          # Main application component
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/bryanscalzo97/random-color-bg.git]
cd random-color-bg
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for Web
- Scan QR code with Expo Go app for physical device

## Usage

- **Change Color**: Tap anywhere on the screen
- **Toggle Relax Mode**: Use the switch at the bottom of the screen
- **Copy Color**: Tap the color display at the bottom
- **Progress Bar**: Shows time remaining in relax mode

## Color Types

The app categorizes colors into three types:

- **Warm**: Red and orange tones
- **Cold**: Blue tones
- **Neutral**: Green, yellow, and other tones

Each type has its own:

- Emoji indicator
- Sound effect
- Visual feedback
