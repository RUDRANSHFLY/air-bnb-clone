import type { Metadata } from "next";
import { Inter, Aboreto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import SignInComp from "@/components/auth/SignInComp";
import SignUpComp from "@/components/auth/SignUpComp";
import getCurrentUser from "@/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

const primaryFont = Aboreto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Air BnB",
  description: "an rental company Clone like AirBnB Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionCurrentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SignInComp />
        <SignUpComp />
        <NavBar currentUser={sessionCurrentUser} />
        {children}
      </body>
    </html>
  );
}
