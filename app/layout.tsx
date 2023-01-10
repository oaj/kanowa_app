// import { Header } from "./header";
import './globals.css';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>Root Layout</div>
        {/* <Header/> */}
        {children}
      </body>
    </html>
  );
}
