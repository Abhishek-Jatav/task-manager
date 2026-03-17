import { ReactNode } from "react";
import Navbar from "../app/components/Navbar";
import ClientProviders from "../lib/context/ClientProviders";
import "./globals.css"; // ✅ MUST BE HERE

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>My App</title>
      </head>

      <body className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-black dark:to-zinc-900">
        <ClientProviders>
          <Navbar />
          <main className="pt-20">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
