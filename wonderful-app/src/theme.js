import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: "#E6F6FF",
    100: "#BAE3FF",
    200: "#7CC4FA",
    300: "#47A3F3",
    400: "#2186EB",
    500: "#0967D2",
    600: "#0552B5",
    700: "#03449E",
    800: "#01337D",
    900: "#002159",
  },
}

const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Montserrat', sans-serif",
}

const styles = {
  global: {
    body: {
      bg: "gray.50",
      color: "gray.800",
    },
  },
}
const darkStyles = {
    global: {
      body: {
        bg: "gray.800",
        color: "gray.50",
      },
    },
  }

const lightTheme = extendTheme({
  config,
  colors,
  fonts,
  styles,
})

const darkTheme = extendTheme({
  config: {
    ...config,
    initialColorMode: "dark",
  },
  colors: {
    ...colors,
    brand: {
      50: "#1a202c",
      100: "#2d3748",
      200: "#4a5568",
      300: "#718096",
      400: "#a0aec0",
      500: "#cbd5e0",
      600: "#e2e8f0",
      700: "#edf2f7",
      800: "#f7fafc",
      900: "#fff",
    },
  },
  fonts,
  darkStyles,
})

export { lightTheme, darkTheme }
