import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Monitoramento de Incubadora",
  description: "Sistema completo para monitoramento de incubadoras de ovos em tempo real",
  keywords: ["Incubadora", "Monitoramento", "Ovos", "Firebase", "Next.js"],
  authors: [{ name: "Incubadora Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sistema de Monitoramento de Incubadora",
    description: "Monitoramento em tempo real de incubadoras de ovos",
    url: "http://localhost:3000",
    siteName: "Incubadora Monitor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Monitoramento de Incubadora",
    description: "Monitoramento em tempo real de incubadoras de ovos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}