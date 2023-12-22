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
  return <div style={{ paddingTop: "100px" }}>{children}</div>;
}
