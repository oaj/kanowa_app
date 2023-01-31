"use client"
import { Header } from './header';
import './globals.css';
import './App.css';
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";

interface IProps { 
  children: ReactNode,
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          <>{children}</>
        </SessionProvider>
      </body>
    </html>
  );
}
