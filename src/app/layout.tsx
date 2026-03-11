import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: {
    default: "1st Aid M.D | First Aid & CPR Training — Victoria & Queensland",
    template: "%s | 1st Aid M.D",
  },
  description:
    "Professional first aid and CPR training for everyday Australians. Courses from $50. Book online across Victoria and Queensland.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "1st Aid M.D | First Aid & CPR Training",
    description:
      "Professional first aid and CPR training for everyday Australians. Courses from $50. Book online across Victoria and Queensland.",
    siteName: "1st Aid M.D",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
