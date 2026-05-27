import type { Metadata } from "next";
import { Geist, Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/components/LenisProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://looks-by-manish-kachru.vercel.app"),
  title: {
    default: "Looks By Manish Kachru | Luxury Makeup Artist",
    template: "%s | Looks By Manish Kachru"
  },
  description:
    "Luxury bridal, editorial, and event makeup artistry by Manish Kachru.",
  openGraph: {
    title: "Looks By Manish Kachru",
    description:
      "A luxury beauty portfolio for bridal, editorial, and cinematic makeup.",
    url: "/",
    siteName: "Looks By Manish Kachru",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, playfair.variable, poppins.variable, "font-sans", geist.variable)}
    >
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
