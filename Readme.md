# React Native Expo Project Installation Guide

This guide outlines the steps to set up and run a React Native project using Expo.

## Prerequisites

Before you begin, ensure the following are installed on your system:

1. **Node.js** (LTS version recommended): [Download Node.js](https://nodejs.org/)
2. **Expo CLI**: Install using `npm` or `yarn` (see instructions below).
3. **Code Editor**: [Visual Studio Code](https://code.visualstudio.com/) is recommended.
4. **Mobile Device or Emulator**:
   - **Expo Go** app (for iOS/Android): [Expo Go on App Store](https://apps.apple.com/) or [Expo Go on Google Play](https://play.google.com/store).
   - Android Emulator or iOS Simulator (optional).

---

## Installation Steps

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd <project-folder-name>
```

2. Install Expo CLI
   If you don’t have Expo CLI installed, install it globally:

```bash
npm install -g expo-cli
```

3. Install Project Dependencies
   Install the required project dependencies using npm or yarn:

```bash
npm install
```

4. Start the Expo Development Server
   Start the development server using Expo CLI:

```bash
npx expo start
```

This command will open a web browser with the Expo Developer Tools.

### Running the Application

1. On a Physical Device
   Install the Expo Go app on your phone.
   Scan the QR code displayed in the Expo Developer Tools or terminal using the Expo Go app.
2. On an Android Emulator
   Ensure Android Studio and the Android Emulator are installed.
   Start the Android Emulator.
   Run the app on the emulator from the Expo Developer Tools or terminal.
3. On an iOS Simulator (Mac Only)
   Ensure Xcode and its Command Line Tools are installed.
   Start the iOS Simulator.
   Run the app on the simulator from the Expo Developer Tools or terminal.
   Additional Commands
   Build APK/IPA for production:
