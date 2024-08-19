import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { clientId } from "./key.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
// Create a custom theme
const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  components: {
    // Override styles globally
    MuiCssBaseline: {
      styleOverrides: `    
         html, body {
              height: 100%;
              margin: 0;
              padding: 0; 
              overflow-x: hidden;
          }

        
          ::-webkit-scrollbar {
             width: 1px; // Set the scrollbar width to a thin line
            }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; // Optional: Adjust or remove the shadow if needed
            border-radius: 10px; // Adjust the border-radius for a sleek look
        }
        ::-webkit-scrollbar-thumb {
          background: silver; // Set to a dark color for visibility, adjust as needed
          border-radius: 10px; // Match the border-radius with the track for consistency
         }

      `,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
);
