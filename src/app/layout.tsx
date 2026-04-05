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
  title: "ช.โชคชัยรถยก รถสไลด์ อะไหล่มือสอง",
  description: "ช.โชคชัยรถยก บริการรถสไลด์ อะไหล่มือสอง ราคาถูก คุณภาพดี พร้อมส่งทั่วไทย",
  keywords: "รถยก, รถสไลด์, อะไหล่มือสอง, ช.โชคชัย, เชียงกง, Toyota, Honda, Isuzu",
  openGraph: {
    title: "ช.โชคชัยรถยก รถสไลด์ อะไหล่มือสอง",
    description: "บริการรถสไลด์ อะไหล่มือสอง ราคาถูก",
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
        <main className="flex-grow pt-16 overflow-hidden">
          {children}
        </main>
        <Footer />
        <ChatBot />
        <WishlistDrawer />
      </body>
    </html>
  );
}
