import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jake Burttram | Mechanical Engineer · Prototyper · Builder",
  description: "A mechanical engineering and hands-on prototyping portfolio: physical systems built with mechanics, electronics, sensing, software, and iteration.",
  openGraph: {
    title: "Jake Burttram | Mechanical Engineer · Prototyper · Builder",
    description: "Turning weird ideas into working physical prototypes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
