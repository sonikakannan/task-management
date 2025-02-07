"use client";

import { useAuth } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

export default function ClientWrapper({ children }) {
  const { userId } = useAuth();
  
  return (
    <>
      {userId && <Sidebar />}
      <div className="w-full max-h-screen">
      {children}
      </div>
    </>
  );
}
