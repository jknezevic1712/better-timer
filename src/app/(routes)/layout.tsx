import "../../styles/globals.css";
import "../../styles/primereact/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import type { Metadata } from "next";

import PrimeReactProvider from "../_components/organisms/primeReactProvider/PrimeReactProvider";

// Components
import Header from "../_components/organisms/header/Header";

export const metadata: Metadata = {
  title: "Better Timer!",
  description: "Better timer made by Jakov Knezevic",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center bg-zinc-100">
        <PrimeReactProvider>
          <Header />
          <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16">
            {children}
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
