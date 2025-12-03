import { Inter, Syncopate } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Samantha Schmid",
  description: "Portfolio for Samantha Schmid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syncopate.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
