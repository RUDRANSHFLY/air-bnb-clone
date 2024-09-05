import type { Metadata } from "next";
import { Inter, Aboreto } from "next/font/google";
import "./globals.css";
import getCurrentUser from "@/actions/getCurrentUser";
import NavBar from "@/components/navbar/NavBar";
import SignInComp from "@/components/auth/SignInComp";
import SignUpComp from "@/components/auth/SignUpComp";
import Rent from "@/components/rent/Rent";
import FilterModel from "@/components/helper/FilterModel";

const inter = Inter({ subsets: ["latin"] });

const primaryFont = Aboreto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Air BnB",
  description: "an rental company Clone like AirBnB Clone",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionCurrentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NavBar currentUser={sessionCurrentUser} />
        <SignInComp />
        <SignUpComp />
        <FilterModel />
        <Rent />
        {children}
      </body>
    </html>
  );
}
