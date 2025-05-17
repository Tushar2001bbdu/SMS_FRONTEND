import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { AppProviders } from "./Components/AppProvider";
import Toast from "@/app/Components/Toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AppProviders>
          <Navbar />
          {children}
          <Toast /> 
        </AppProviders>
      </body>
    </html>
  );
}
