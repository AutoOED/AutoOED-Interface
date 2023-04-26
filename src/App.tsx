import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./config/router";

function App() {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },
          body: {
            fontSize: theme.fontSizes.md,
            color: "hsla(0,0%,100%,0.85)",
          },
          a: {
            outline: "none",
            textDecoration: "none",
          },
          svg: {
            fontSize: theme.fontSizes.lg,
          },
        }),
        colors: {
          brand: [
            "#E9F0FC",
            "#C0D6F6",
            "#98BBF1",
            "#70A1EB",
            "#4887E5",
            "#1F6CE0",
            "#2872E1",
            "#134186",
            "#0C2B5A",
            "#06162D",
          ],
        },
        primaryColor: "brand",
        fontSizes: {
          xs: "0.6rem",
          sm: "0.75rem",
          md: "0.8125rem",
          lg: "1rem",
          xl: "1.2rem",
        },
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </MantineProvider>
  );
}

export default App;
