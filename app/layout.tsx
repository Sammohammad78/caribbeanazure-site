import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caribbean Azure | Slimme AI Automatisering",
  description: "Slimme automatisering die wél oplevert. AI-workflows die tijd besparen en omzet verhogen.",
  keywords: ["AI", "automatisering", "integratie", "chatbots", "Nederland"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
