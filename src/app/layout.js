//import {Inter} from "next/font/google";
//import "./globals.css";
//import "../styles/css/bootstrap.css";
//import "../styles/css/responsive.css";
import "../styles/css/style.css";
import "../styles/css/header.css";
import "../styles/css/footer.css";

//const inter = Inter({subsets: ["latin"]});

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
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"/>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>

            </head>

            <body>{children}</body>
        </html>
    );
}
