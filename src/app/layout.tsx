import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "MAVARIX - ศูนย์รวมอะไหล่รถยนต์คุณภาพ",
  description: "ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง ราคาย่อมเยา ครบทุกยี่ห้อ Toyota, Honda, Mazda, Isuzu และอื่นๆ พร้อมบริการจัดส่งทั่วประเทศ",
  keywords: "อะไหล่รถยนต์, อะไหล่แท้, Toyota, Honda, Mazda, อะไหล่รถ, ชิ้นส่วนรถยนต์",
  openGraph: {
    title: "MAVARIX - ศูนย์รวมอะไหล่รถยนต์คุณภาพ",
    description: "ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง ราคาย่อมเยา ครบทุกยี่ห้อ",
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
      </body>
    </html>
  );
}
