import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { AppProviders } from "./Components/AppProvider";
import Toast from "@/app/Components/Toast";
import ChatBot from "./Components/ChatBot";
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
          <div className="mt-8">
         
          <div className="float-right fixed bottom-0 right-0 p-4">
          <ChatBot className="float-right" />
          </div>
         
        
      </div>
    
        </AppProviders>
      </body>
    </html>
  );
}
