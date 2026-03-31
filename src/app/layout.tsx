import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuchen Zhang — Designer & Product",
  description: "Portfolio of Yuchen Zhang — founding designer, product manager, and builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
