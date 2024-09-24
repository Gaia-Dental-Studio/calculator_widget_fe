"use client";

import "../../styles/css/cart.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css'; // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Owl Carousel Theme CSS
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {checkCategory} from '../../helper/helper';
import {checkImage} from '../../helper/helper';

export default function Dashboard() {
    const [carts, setCarts] = useState([]);
    const [totalCarts, setTotalCarts] = useState([]);

    const initializeCartId = () => {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            cartId = 1;
            localStorage.setItem('cartId', cartId);
        }
        return parseInt(cartId);
    };

    const getAllCarts = () => {
        const cartId = initializeCartId();  // Ambil cartId terakhir
        const carts = [];

        for (let i = 1; i < cartId; i++) {
            const cartResults = localStorage.getItem(`cart${i}Results`);
            const cartResults2 = localStorage.getItem(`cart${i}Results2`);

            if (cartResults && cartResults2) {
                carts.push({
                    cartId: i,
                    results: JSON.parse(cartResults),
                    results2: JSON.parse(cartResults2),
                });
            }
        }

        return carts;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        var dataPost = {
            "fields": {
                "Agreement ID": "Test 1",
                "Interest Rate": 0.12,
                "Loan Term (Months)": 24
            }
        };

        console.log(dataPost);
        //return;
        try {
            const response = await fetch('https://api.airtable.com/v0/appLCog6dSk4upByJ/tbl15gz7VpqQKpeg7', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer patNnnjdWrABCfNXR.a6a4729e6bb336102cfb3117233682c474a4c94180431724139a4baa2370eb29'
                },
                body: JSON.stringify(dataPost),
            });

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatNumber = (number) => {
        // Round the number to the nearest integer
        const roundedNumber = Math.round(number || 0);

        // Format the number with commas for thousands separator
        return roundedNumber.toLocaleString('en-US');
    }

    const deleteDataStorage = (id) => {
        const isConfirmed = window.confirm('You want to delete this data?');
        if (isConfirmed) {
            // Hapus item dari localStorage berdasarkan ID
            localStorage.removeItem(`cart${id}Results`);

            // Tampilkan pesan sukses
            alert("Successfully deleted data");
            window.location.reload();
        }
    };

    const handleDownloadPdf = () => {
        const content = document.getElementById('content');

        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('download.pdf');
        });
    };


    const formatString = (str = "") => {
        if (str === null) {
            return;
        }

        return str
            .split(/-|_/) // Split the string by dash (-) or underscore (_)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter
            .join(' '); // Join words with a space
    };

    useEffect(() => {
        const allCarts = getAllCarts();
        setCarts(allCarts);
        const totalsByMonth = {};

        allCarts.forEach(cart => {
            cart.results2.forEach(payment => {
                const month = payment.Month;

                // If the month doesn't exist in totalsByMonth, initialize it
                if (!totalsByMonth[month]) {
                    totalsByMonth[month] = {
                        Month: month,
                        "Added Value Payment": 0,
                        "Interest Payment": 0,
                        "Principal Payment": 0,
                        "Remaining Principal": 0,
                        "Total Payment": 0
                    };
                }

                // Add the current cart's payment values to the corresponding month in totalsByMonth
                totalsByMonth[month]["Added Value Payment"] += payment["Added Value Payment"];
                totalsByMonth[month]["Interest Payment"] += payment["Interest Payment"];
                totalsByMonth[month]["Principal Payment"] += payment["Principal Payment"];
                totalsByMonth[month]["Remaining Principal"] += payment["Remaining Principal"];
                totalsByMonth[month]["Total Payment"] += payment["Total Payment"];
            });
        });

        // Convert totalsByMonth object to an array (optional)
        const resultArray = Object.values(totalsByMonth);
        setTotalCarts(resultArray);
        console.log(resultArray);
        console.log(allCarts);


        $(document).ready(function () {
            $(".owl-carousel").owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                navText: [],
                autoplay: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 4
                    }
                }
            });

            // Inisialisasi carousel kedua
            $(".owl-2").owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                navText: [],
                autoplay: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 4
                    }
                }
            });
        });
    }, []);

    return (
        <main>
            <Header />
            <div className="container mt-5 p-3 rounded cart">
                <div className="row no-gutters" id="content">
                    <div className="col-md-8">
                        <div className="product-details mr-2">
                            <a style={{display: "contents"}} href="https://medigear.webflow.io/shop">
                                <div className="d-flex flex-row align-items-center">
                                    <i className="fa fa-arrow-left"></i>
                                    <span className="ml-2">Continue Shopping</span>
                                </div>
                            </a>
                            <hr />
                            <h6 className="mb-0">Shopping cart</h6>
                            <div className="d-flex justify-content-between">
                                <span>You have {carts.length || 0} items in your cart</span>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="text-black-50"></span>
                                    <div className="price ml-2">
                                        <span className="mr-1"></span>
                                        <i className=""></i>
                                    </div>
                                </div>
                            </div>
                            {carts.map((cart, index) => (
                                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                                    <div className="d-flex flex-row">
                                        <div className="img-items" width="40" >
                                            {checkImage(cart.results.product_name)}
                                        </div>
                                        <div className="ml-2">
                                            <span className="font-weight-bold d-block">
                                                {formatString(cart.results.product_name)}
                                            </span>
                                            <span className="spec">
                                                {checkCategory(cart.results.product_name)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <span className="d-block">
                                            {cart.results.loan_term * 12} Months
                                        </span>
                                        <span className="d-block ml-5 font-weight-bold">
                                            ${formatNumber(cart.results.monthlyPayment)}
                                        </span>
                                        <i onClick={() => deleteDataStorage(cart.cartId)} data-key={cart.cartId} style={{cursor: 'pointer'}} className="fa fa-trash-alt ml-3 text-black-50"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="payment-info">
                            <table className="table-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-center" >Month</th>
                                        <th className="text-center" >Monthly Repayment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalCarts.map((result, index) => (
                                        <tr key={index}>
                                            <td className="text-center" >{result.Month}</td>
                                            <td className="text-center" >${formatNumber(result["Total Payment"])}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <hr className="line" />
                            <div className="d-flex justify-content-between information">
                                <span>Subtotal</span>
                                <span>
                                    ${formatNumber(totalCarts.reduce((acc, result) => acc + result["Total Payment"], 0))}
                                </span>
                            </div>
                            <button onClick={handleDownloadPdf} style={{backgroundColor: '#2e77d0', color: 'white'}} className="btn btn-block d-flex justify-content-between mt-3" type="button">
                                <span>
                                    ${formatNumber(totalCarts.reduce((acc, result) => acc + result["Total Payment"], 0))}
                                </span>
                                <span>Checkout <i className="fa fa-long-arrow-right ml-1"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
