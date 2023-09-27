import "../../styles/globals.css";
import "../../assets/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import type { Metadata } from "next";

import PrimeReactProvider from "../_components/organisms/primeReactProvider/PrimeReactProvider";

// Components
// import Header from '../_components/organisms/header/Header';
// import Footer from '../_components/organisms/footer/Footer';

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
      <body className="flex min-h-screen items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <PrimeReactProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </PrimeReactProvider>
        </div>
      </body>
    </html>
  );
}
