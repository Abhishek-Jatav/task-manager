import { ReactNode } from "react";
import Navbar from "../app/components/Navbar";
import Providers from "../lib/context/Providers";
import "./globals.css";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-[#0f0f11] text-white">
        <Providers>
          <Navbar />

          <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
