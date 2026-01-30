import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Coach Rank - D1 Football Coach Rankings",
    description: "Data-driven rankings of Division I football coaches based on ATS performance, talent maximization, and player experience.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen bg-gray-50">
                    {children}
                </main>
                <footer className="bg-field-green-dark text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h3 className="font-headline text-2xl mb-2">COACH RANK</h3>
                            <p className="text-gray-300 mb-4">Data-driven D1 football coach rankings</p>
                            <p className="text-sm text-gray-400">
                                © 2026 Coach Rank. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
