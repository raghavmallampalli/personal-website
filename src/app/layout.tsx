import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import TabBar from "./components/TabBar";
import TitleBar from "./components/TitleBar";
import MobileDrawer from "./components/MobileDrawer";
import { NavProvider } from "./context/NavContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raghav Mallampalli - Portfolio",
  description: "Personal portfolio site with Dracula theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] flex items-center justify-center h-full min-h-[100dvh] overflow-hidden`}
      >
        <NavProvider>
          <div 
            className="w-full h-[100dvh] md:w-[calc(100vw-16px)] md:h-[calc(100vh-16px)] md:max-h-[calc(100dvh-16px)] md:rounded-lg shadow-2xl flex flex-col overflow-hidden border-0 md:border"
            style={{ 
              backgroundColor: 'var(--dracula-background)',
              borderColor: 'var(--dracula-comment)'
            }}
          >
            <TitleBar />
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex flex-1 min-h-0 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                  <TabBar />
                  <main className="flex-1 min-h-0 overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'var(--dracula-background)' }}>
                    {children}
                  </main>
                </div>
              </div>
              <StatusBar />
            </div>
          </div>
          <MobileDrawer />
        </NavProvider>
      </body>
    </html>
  );
}
