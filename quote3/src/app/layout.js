import "@/styles/globals.css";
import { geistMono, geistSans } from "@/styles/fonts/fonts";

import Header from "@/components/header/header.js";
import Providers from "@/components/redux/provider";
import Initializer from "@/components/initializer/initializer";
import HomeLayout from "@/components/layout/home_layout";

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
          <Initializer>
            <Header />
            <HomeLayout>{children}</HomeLayout>
          </Initializer>
        </Providers>
      </body>
    </html>
  );
}
