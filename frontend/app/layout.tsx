import { ReactNode } from "react";
import Navbar from "../app/components/Navbar";
import ClientProviders from "../lib/context/ClientProviders";
import { Toaster } from "react-hot-toast";
import "./globals.css";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-[#0f0f11] text-white">
        <ClientProviders>
          <Navbar />

          <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>

          {/* Toast Global */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid #27272a",
              },
            }}
          />
        </ClientProviders>
      </body>
    </html>
  );
}
