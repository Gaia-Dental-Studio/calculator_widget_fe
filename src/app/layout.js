import {Inter} from "next/font/google";
//import "./globals.css";
import "../styles/css/bootstrap.css";
import "../styles/css/responsive.css";
import "../styles/css/style.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Calculator Widget",
    description: "Prototype App",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <head>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <script src="/js/jquery-3.4.1.min.js"></script>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
