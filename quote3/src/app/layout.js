import "./globals.css";

import { geistMono, geistSans } from "@/fonts/fonts";

export const metadata = {
  title: "Quotes Base",
  description: "Quotes Base",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <h1>Quotes Base</h1>
        {children}
      </body>
    </html>
  );
}
