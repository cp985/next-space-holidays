import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galactic Horizons | Space Travel Agency",
  description:
    "Explore Mars, Saturn, and beyond with us. Your journey to the stars starts here.",

  // Icone
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },

  // Open Graph (per la condivisione su WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "Galactic Horizons | Journey Beyond the Stars",
    description:
      "The future of space travel is here. Explore Mars, Saturn, and beyond.",
    url: "https://galactic-horizons.vercel.app",
    siteName: "Galactic Horizons",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Galactic Horizons Space Agency",
      },
    ],
    locale: "en-US",
    type: "website",
  },

  // Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "Galactic Horizons | Viaggi Spaziali",
    description: "Explore Mars, Saturn, and beyond with us.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
