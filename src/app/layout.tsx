import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import WishlistDrawer from "@/components/products/WishlistDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: "ช.โชคชัย - ขายรถและอะไหล่มือสอง มีรถสไลด์",
  description: "ช.โชคชัย ขายรถมือสอง อะไหล่มือสอง และบริการรถสไลด์ ราคาถูก คุณภาพดี พร้อมส่งทั่วไทย",
  keywords: "ขายรถมือสอง, อะไหล่มือสอง, รถสไลด์, เชียงกง, Toyota, Honda, Isuzu",
  openGraph: {
    title: "ช.โชคชัย - ขายรถและอะไหล่มือสอง มีรถสไลด์",
    description: "ขายรถมือสอง อะไหล่มือสอง และบริการรถสไลด์ ราคาถูก",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <ChatBot />
        <WishlistDrawer />
      </body>
    </html>
  );
}
