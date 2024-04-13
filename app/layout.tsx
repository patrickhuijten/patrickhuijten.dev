import "./globals.css";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

const inter = Source_Sans_3({ subsets: ["latin"] });

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
});

export const metadata: Metadata = {
  title: "Patrick Huijten - Software Engineer",
  description: "Patricks personal space on the web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
