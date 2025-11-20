// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // create this file if it doesn't exist
import '../src/index.css';   // adjust this to match your real CSS file(s)



import React from "react";

export const metadata: Metadata = {
  title: "Starting Over Medical",
  description: "Rehabilitation Farm App",
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