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
  title: "MAVARIX - ศูนย์รวมอะไหล่รถยนต์มือสอง ราคาถูก",
  description: "ศูนย์รวมอะไหล่รถยนต์มือสองคุณภาพดี ราคาถูก คัดเกรด A รับประกันคุณภาพ มีครบทุกยี่ห้อ Toyota, Honda, Mazda, Isuzu พร้อมส่งทั่วไทย",
  keywords: "อะไหล่รถยนต์มือสอง, เชียงกง, อะไหล่รถบ้าน, อะไหล่ถอด, Toyota, Honda, Mazda",
  openGraph: {
    title: "MAVARIX - ศูนย์รวมอะไหล่รถยนต์มือสอง ราคาถูก",
    description: "อะไหล่รถยนต์มือสอง คัดเกรดคุณภาพ ราคาสบายกระเป๋า",
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
