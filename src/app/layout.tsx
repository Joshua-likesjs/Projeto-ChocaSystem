import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProviderVPJS } from "@/contexts/AuthContextVPJS";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Incubadora VPJS 🥚",
  description: "Sistema inteligente de monitoramento e controle para incubação de ovos com controle de temperatura, umidade e luminosidade em tempo real.",
  keywords: ["Incubadora", "Avicultura", "IoT", "Monitoramento", "VPJS", "Firebase", "Next.js"],
  authors: [{ name: "VPJS Team" }],
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnu5gybb1rK9jzyg2juCUZnPT3iMIt4IphQ&s",
  },
  openGraph: {
    title: "Incubadora VPJS",
    description: "Sistema inteligente de incubação de ovos com monitoramento em tempo real",
    url: "https://vpjs-incubadora.com",
    siteName: "VPJS Incubadora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incubadora VPJS",
    description: "Sistema inteligente de incubação de ovos com monitoramento em tempo real",
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
        <AuthProviderVPJS>
          {children}
        </AuthProviderVPJS>
        <Toaster />
      </body>
    </html>
  );
}
