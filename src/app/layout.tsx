import type { Metadata } from "next";
import SpotlightTransition from "@/components/SpotlightTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuchen Zhang_Product Designer",
  description: "Yuchen Zhang_Product Designer_Homepage",
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lustria&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SpotlightTransition>{children}</SpotlightTransition>
      </body>
    </html>
  );
}
