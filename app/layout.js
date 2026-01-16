import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SearchBox from "@/components/SearchBox"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home-Folder ",
  description: "Ghar ka maal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL SEARCH */}
        <div className="border-b p-3">
          <SearchBox />
        </div>

        {/* PAGE CONTENT */}
        {children}
      </body>
    </html>
  )
}
