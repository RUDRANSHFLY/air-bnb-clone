import type { Metadata } from "next";
import { Inter, Aboreto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const primaryFont = Aboreto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Air BnB",
  description: "an rental company Clone like AirBnB Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
