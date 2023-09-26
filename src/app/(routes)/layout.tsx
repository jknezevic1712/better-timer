import "../../styles/globals.css";
import type { Metadata } from "next";

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
      <body>
        <>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </>
      </body>
    </html>
  );
}
