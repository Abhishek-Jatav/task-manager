"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";
// import BackendGate from "../../hooks/backendCheck/BackendGate";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="nexabuild-theme"
      disableTransitionOnChange>
      <AuthProvider>
        {/* <BackendGate> */}
          {children}

          {/* Global Toaster */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#18181b",
                color: "#fff",
                border: "1px solid #27272a",
              },
            }}
          />
        {/* </BackendGate> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
