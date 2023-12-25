import { Header } from "@/app/features/articles/header";
import type { Metadata } from "next";

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
    <>
      <Header />
      {children}
    </>
  );
}
