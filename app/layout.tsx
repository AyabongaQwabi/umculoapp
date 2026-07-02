import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={poppins.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
