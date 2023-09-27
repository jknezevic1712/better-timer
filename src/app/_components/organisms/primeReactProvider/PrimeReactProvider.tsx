"use client";

import { PrimeReactProvider as PrimeProvider } from "primereact/api";
import { Toaster } from "react-hot-toast";

export default function PrimeReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimeProvider>
      <Toaster />
      {children}
    </PrimeProvider>
  );
}
