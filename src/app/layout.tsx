import type { Metadata } from "next";
import { Dancing_Script, Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Six Months of Us",
  description: "A little corner of the internet just for us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dancing.variable} ${cormorant.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
