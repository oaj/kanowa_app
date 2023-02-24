"use client"
import './globals.css';
import './App.css';
import { Header } from './header';
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';
import { darkTheme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";

interface IProps {
  children: ReactNode,
}

export default function RootLayout({ children }: IProps) {
  return (
    <html className="h-screen" lang="en">
    <body className="">
        <SessionProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Header />
                <div className="max-w-full flex justify-center grid-cols-1">
                    <div className="max-w-7xl border-1">
                    {children}
                    </div>
                </div>
            </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
