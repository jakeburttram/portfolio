import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jake Burttram — Mechanical Engineer & Maker",
  description: "A maker portfolio of unusual ideas brought to life through engineering, code, fabrication, and prototyping.",
  openGraph: {
    title: "Jake Burttram — Mechanical Engineer & Maker",
    description: "Unusual ideas, brought to life through engineering and making.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
