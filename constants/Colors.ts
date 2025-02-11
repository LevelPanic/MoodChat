/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#26C6DA';  // Primary Teal for Light mode
const tintColorDark = '#26C6DA';   // Same primary teal for Dark mode

export const Colors = {
  light: {
    text: '#fefdfe',       // Dark text for light backgrounds
    background: '#222531', // Light mode background
    tint: tintColorLight,  // Used for highlights, icons, etc.
    icon: '#687076',       // Muted gray for icons on light background
    tabIconDefault: '#80CBC4',    // Secondary teal for unselected tab icons
    tabIconSelected: tintColorLight,  // Primary teal for selected tab icons
  },
  dark: {
    text: '#fefdfe',       // Light text for dark backgrounds
    background: '#222531', // Standard dark mode background
    tint: tintColorDark,   // Primary teal accent in dark mode
    icon: '#9BA1A6',       // Muted gray for icons on dark background
    tabIconDefault: '#80CBC4',     // Secondary teal for unselected tab icons
    tabIconSelected: tintColorDark, // Primary teal for selected tab icons
  },
};
