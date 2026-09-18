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
  title: "Samantha Schmid | Operations Analyst",
  description:
    "Operations Analyst with a background in mechanical engineering and business analytics, working across data, process improvement, automation, and product development.",
  openGraph: {
    title: "Samantha Schmid | Operations Analyst",
    description:
      "Operations Analyst with a background in mechanical engineering and business analytics, working across data, process improvement, automation, and product development.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Samantha Schmid | Operations Analyst",
    description:
      "Operations Analyst with a background in mechanical engineering and business analytics, working across data, process improvement, automation, and product development.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0f14",
  colorScheme: "dark",
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
