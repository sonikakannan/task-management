import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/provider/ContextProvider";
import GlobalStyleProvider from "@/provider/GlobalStyleProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ClientWrapper from "./ClientWrapper";
import { TaskProvider } from "@/context/taskContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ContextProvider>
            <TaskProvider>
            <GlobalStyleProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </GlobalStyleProvider>
            </TaskProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
