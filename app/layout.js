import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";
import SideMenu from "@/components/sideMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ziprus Chemicals Blog",
  description: "Stay updated with the latest news and trends in industrial solid minerals and technologies.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <SideMenu/>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
