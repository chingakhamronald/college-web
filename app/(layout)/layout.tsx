"use client";

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container w-full m-auto flex-grow">{children}</main>
    </div>
  );
}
