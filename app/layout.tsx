import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from '@/components/CookieConsent';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
