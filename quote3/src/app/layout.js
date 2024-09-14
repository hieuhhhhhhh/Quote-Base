import "@/styles/globals.css";

import { geistMono, geistSans } from "@/fonts/fonts";
import Header from "@/components/header";

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
        <Header />
        <div>{children}</div>
        {/* Adjust the margin as needed */}
      </body>
    </html>
  );
}
