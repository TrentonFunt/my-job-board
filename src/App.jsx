
import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--fallback-b1, var(--b1)))',
              color: 'hsl(var(--fallback-bc, var(--bc)))',
              border: '1px solid hsl(var(--fallback-b3, var(--b3)))',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: 'hsl(var(--fallback-s, var(--su)))',
                secondary: 'hsl(var(--fallback-sc, var(--suc)))',
              },
            },
            error: {
              iconTheme: {
                primary: 'hsl(var(--fallback-er, var(--er)))',
                secondary: 'hsl(var(--fallback-erc, var(--erc)))',
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
