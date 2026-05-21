import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import NavLanding from "@/components/landingpage/NavLanding";
import LoadingGlobal from "@/components/landingpage/LoadingGlobal"
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
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://next-space-holidays.vercel.app/"
      : "http://localhost:3000",
  ),
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
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <SessionProvider refetchOnWindowFocus={true} refetchInterval={5}>
           <LoadingGlobal/>

 <NavLanding />
            {children}
            {modal}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
