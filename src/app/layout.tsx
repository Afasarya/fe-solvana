import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Solvana - Mental Health Platform",
  description: "Your journey to better mental health starts here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans antialiased`}>
      <AuthProvider>
      {children}
    </AuthProvider>
      </body>
    </html>
  );
}
