"use client";

import Header from '../../components/Header';
import Footer from '../../components/Header';
import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css'; // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Owl Carousel Theme CSS
import Link from 'next/link';


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
                "Loan Term (Months)" : 24
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
            <section className="health_section layout_padding">
                <div className="health_carousel-container">
                    <h2 className="text-uppercase">
                        Cart List
                    </h2>
                    {carts.map((cart) => (
                        <div key={cart.cartId}>
                            <h2>Cart {cart.cartId} Data</h2>
                            <div>
                                <p>Annual Rate: {cart.results.annual_rate}</p>
                                <p>Principal: {cart.results.principal}</p>
                                <p>Maintenance Fee: {cart.results.maintenance_fee}</p>
                            </div>

                            <h3>Monthly Payments</h3>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Added Value Payment</th>
                                        <th>Interest Payment</th>
                                        <th>Principal Payment</th>
                                        <th>Remaining Principal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.results2.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Month}</td>
                                            <td>{item["Added Value Payment"]}</td>
                                            <td>{item["Interest Payment"]}</td>
                                            <td>{item["Principal Payment"]}</td>
                                            <td>{item["Remaining Principal"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}

                    <div>
                        <h2>Total All Item</h2>
                        <div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Added Value Payment</th>
                                        <th>Interest Payment</th>
                                        <th>Principal Payment</th>
                                        <th>Remaining Principal</th>
                                        <th>Monthly Repayment ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalCarts.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.Month}</td>
                                            <td>{result["Added Value Payment"]}</td>
                                            <td>{result["Interest Payment"]}</td>
                                            <td>{result["Principal Payment"]}</td>
                                            <td>{result["Remaining Principal"]}</td>
                                            <td>{result["Total Payment"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className=''>
                        <buton className='btn btn-primary' onClick={handleSubmit} >Submit</buton>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
