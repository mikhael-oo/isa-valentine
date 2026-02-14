import type { Metadata } from "next";
import { Domine, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import LiquidGlassNav from "./components/LiquidGlassNav";
import LoveBubbles from "./components/LoveBubbles";

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For My Love",
  description: "A canvas to show you how much you mean to me",
};

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var theme = localStorage.getItem('isa-valentine-theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', theme === 'dark' || theme === 'light' ? theme : (prefersDark ? 'dark' : 'light'));
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${domine.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeScript />
        <ThemeProvider>
          <LoveBubbles />
          {children}
          <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
            <div className="w-fit max-w-[60%]">
              <LiquidGlassNav />
            </div>
          </div>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
