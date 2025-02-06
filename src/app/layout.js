"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { AppProviders } from "./Components/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       
      </head>
      <body className={inter.className}>
        <AppProviders>
          <div>
          <Navbar />
          </div>
         
          <div className="mt-16">  {children} </div>
        
        </AppProviders>
      </body>
    </html>
  );
}
