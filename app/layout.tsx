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
    <html lang="en">
    <body>
        <SessionProvider>
          <Header />
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <>{children}</>
            </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
