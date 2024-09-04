import { Inter } from "next/font/google";
//import "./globals.css";
import "../styles/css/bootstrap.css";
import "../styles/css/responsive.css";
import "../styles/css/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calculator Widget",
  description: "Prototype App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
