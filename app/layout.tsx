import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunglasses Price Comparison | Top Australian Retailers",
  description: "Compare sunglasses prices across the top 10 Australian e-commerce retailers. Find the best deals on Ray-Ban, Oakley, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
