import type { Metadata } from "next";
import {Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",

})
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"], 
  weight: ['400', '700'],
  variable: "--font-ibm-plex-serif",
  display: 'swap',
})
export const metadata: Metadata = {
  title: "cloudmagic",
  description: "Deploy your code to the cloud with ease",
  icons: {
    icon: "/Icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
