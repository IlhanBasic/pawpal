# PawPal 🐶

A simple React Native application that displays a list of dogs and allows users to mark their favorite ones. Built with Expo, React Navigation, and custom UI styling.

## ✨ Features

- View a full list of dogs
- Mark/unmark favorites
- Tab-based navigation (List & Favorites)
- Drawer-based navigation with custom icons
- Clean and responsive UI
- Gradient background for Home Screen

## 📱 Technologies Used

- React Native (Expo)
- React Navigation (Drawer, Bottom Tabs, Stack)
- Context API for state management
- Linear Gradient
- Custom icon integration (Ionicons, FontAwesome6)
- Custom color theme

## 🎨 UI Colors

The app uses a centralized color palette defined in `colors.js`:

```js
const COLORS = {
  light: "#FFFFFF",
  dark: "#121212",
  placeholder: "#9E9E9E",
  primary: "#FF7A00",
  primaryLight: "#FFA94D",
  primaryDark: "#CC5F00",
  secondary: "#F1F1F1",
  background: "#FAFAFA",
  border: "#E0E0E0",
  textDark: "#1C1C1E",
  textLight: "#757575",
  success: "#2ECC71",
  error: "#E74C3C",
  warning: "#F39C12",
  info: "#3498DB",
  overlay: "rgba(0, 0, 0, 0.5)",
};
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/DogListApp.git
   cd DogListApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npx expo start (expo go)
   npx expo run:ios
   npx expo run:android
   ```

## 🛠️ Future Improvements

- Add search/filter functionality
- Connect to a real API (now is firebase)
- Enable login and sign up with email (OAuth2)

## 🤝 Contributing
``` bash
Contributions, suggestions and improvements are welcome!  
Feel free to fork the repo, create a branch and submit a pull request.  
💡 Ideas, 🛠️ fixes, and ✨ features are appreciated!
```
