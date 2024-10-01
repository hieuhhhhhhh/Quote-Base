import "@/styles/globals.css";
import { geistMono, geistSans } from "@/styles/fonts/fonts";

import Header from "@/components/header/header.js";

// npm install redux react-redux
// npm install @reduxjs/toolkit react-redux
import Providers from "@/components/redux/provider";

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
        <Providers>
          <Header />
          <div>{children}</div>
          {/* Adjust the margin as needed */}
        </Providers>
      </body>
    </html>
  );
}
