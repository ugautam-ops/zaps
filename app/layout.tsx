import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zap Mind - Test Your Cognitive Abilities",
  description: "Measure your reaction time, memory, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
