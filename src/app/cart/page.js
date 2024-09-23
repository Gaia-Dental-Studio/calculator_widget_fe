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

        // Fungsi untuk membuat PDF dari div yang memiliki id 'content'
    const handleDownloadPdf = () => {
        const content = document.getElementById('content'); // Ambil elemen dengan id 'content'

        // Mengambil screenshot dari elemen dan mengkonversinya menjadi canvas
        html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Membuat objek jsPDF

            const imgWidth = 210; // Lebar PDF (A4 ukuran standar dalam mm)
            const pageHeight = 295; // Tinggi PDF (A4 ukuran standar dalam mm)
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Menghitung tinggi gambar proporsional
            let heightLeft = imgHeight;

            let position = 0;

            // Tambahkan gambar ke PDF, dan tambahkan halaman jika kontennya lebih panjang
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Unduh PDF
            pdf.save('download.pdf');
        });
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
            <div class="container">
                <div class="card shopping-cart" id="content" >
                    <div class="card-header bg-dark text-light">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        Shipping cart
                        <a href="" class="btn btn-sm pull-right"></a>
                        <div class="clearfix"></div>
                    </div>
                    <div class="card-body">
                        {carts.map((cart, index) => (
                            <div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <h4 class="product-name"><strong>{cart.results.product_name}</strong></h4>
                                        <h4>
                                            <small>Product description</small>
                                        </h4>
                                    </div>
                                    <div class=" text-sm-center col-lg-8 text-md-right row">
                                        <div class="col-lg-5 text-md-right" >
                                            <h6>Monthly Payment : <strong>${formatNumber(cart.results.monthlyPayment)}</strong></h6>
                                        </div>
                                        <div class="col-lg-5 text-md-right" >
                                            <h6>Loan Term : <strong>{cart.results.loan_term * 12} Months</strong></h6>
                                        </div>
                                        <div class="col-lg-2 text-md-right" >
                                            <button onClick={() => deleteDataStorage(cart.cartId)} data-key={cart.cartId} type="button" className="btn btn-outline-danger btn-xs">
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <div class="">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center" >Month</th>
                                        <th className="text-center" >Monthly Repayment ($)</th>
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
                                <tfoot>
                                    <tr>
                                        <td className="text-right"><strong>Total</strong></td>
                                        <td className="text-center" ><strong>${formatNumber(totalCarts.reduce((acc, result) => acc + result["Total Payment"], 0))}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>
                    <div class="card-footer">
                        <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                            <div class="row">
                                <div class="col-6">
                                </div>
                                <div class="col-6">
                                </div>
                            </div>
                        </div>
                        <div class="pull-right">
                            <a  onClick={handleDownloadPdf} class="btn btn-success pull-right">Checkout</a>
                            <div class="pull-right">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
