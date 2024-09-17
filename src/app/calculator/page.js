"use client";

import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css'; // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Owl Carousel Theme CSS
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const [resultCollection, setResultCollection] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        var formArray = $('#form_data').serializeArray();
        var formData = {};

        formArray.forEach(function (item) {
            var value = isNaN(item.value) ? item.value : parseFloat(item.value);
            formData[item.name] = value;
        });

        try {
            const response = await fetch('http://127.0.0.1:5000/set_user_parameters_scheme_1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            const addedValuePayment = result.results2.map((item) => item["Added Value Payment"].toFixed(2));
            const principalPayments = result.results2.map((item) => item["Principal Payment"].toFixed(2));
            const interestPayments = result.results2.map((item) => item["Interest Payment"].toFixed(2));
            const months = result.results2.map((item) => `Month ${item.Month}`);

            const totaladdedValuePayment = addedValuePayment.reduce((total, current) => parseFloat(total) + parseFloat(current), 0);
            const totalprincipalPayments = principalPayments.reduce((total, current) => parseFloat(total) + parseFloat(current), 0);
            const totalinterestPayments = interestPayments.reduce((total, current) => parseFloat(total) + parseFloat(current), 0);
            console.log('Success:', result);
            setChartData({
                series: [
                    {
                        name: 'Added Value Payment',
                        data: addedValuePayment,
                    },
                    {
                        name: 'Principal Payment',
                        data: principalPayments,
                    },
                    {
                        name: 'Interest Payment',
                        data: interestPayments,
                    },
                ],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    xaxis: {
                        categories: months,
                    },
                },
            });


            setDonutChartData({
                series: [(totaladdedValuePayment || 0), (totalprincipalPayments || 0), (totalinterestPayments || 0)], // Data series
                options: {
                    labels: ['Total Added Value Payment', 'Total Principal Payment', 'Total Interest Payment'],
                    chart: {
                        type: 'donut',
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            });

            setResult(result);

        } catch (error) {
            console.error('Error:', error);
        }
    };


    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Added Value Payment',
                data: [], //Principle payment
            },
            {
                name: 'Principal Payment',
                data: [], //Principle payment
            },
            {
                name: 'Interest Payment',
                data: [], //Interest payment
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                //type: 'datetime',
                categories: [],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        },
    });

    const [donutChartData, setDonutChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    // Inisialisasi cartId
    const initializeCartId = () => {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            cartId = 1;
            localStorage.setItem('cartId', cartId); // Inisialisasi dengan nilai 1
        }
        return parseInt(cartId);
    };

    // Update cartId setelah cart baru ditambahkan
    const incrementCartId = () => {
        let cartId = localStorage.getItem('cartId');
        cartId = parseInt(cartId) + 1;
        localStorage.setItem('cartId', cartId);  // Update ke cartId baru
        return cartId;
    };

    const addNewCart = () => {
        try {
            const cartId = initializeCartId(); // Ambil cartId yang ada atau inisialisasi
            localStorage.setItem(`cart${cartId}Results`, JSON.stringify(result.results));
            localStorage.setItem(`cart${cartId}Results2`, JSON.stringify(result.results2));

            // Tingkatkan cartId setelah cart baru ditambahkan
            incrementCartId();
            alert("New cart added successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error adding cart:", error);
        }
    };

    useEffect(() => {
        $(document).ready(function () {

            //$('[data-bs-toggle="tooltip"]').tooltip();
            // Inisialisasi carousel pertama
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
        <main>        <div className="hero_area_">
            <header className="header_section">
                <div className="container">
                    <div className="top_contact-container">
                        <div className="tel_container">
                            <a href="">
                                <img src="/images/telephone-symbol-button.png" alt="" /> +01 1234567890
                            </a>
                        </div>
                        <div className="social-container">
                            <a href="">
                                <img src="/images/fb.png" alt="" className="s-1" />
                            </a>
                            <a href="">
                                <img src="/images/twitter.png" alt="" className="s-2" />
                            </a>
                            <a href="">
                                <img src="/images/instagram.png" alt="" className="s-3" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
                        <a className="navbar-brand" href="index.html">
                            <img src="images/logo.png" alt="" />
                            <span>
                                Medion
                            </span>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex  flex-column flex-lg-row align-items-center w-100 justify-content-between">
                                <ul className="navbar-nav  ">
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/calculator" className="nav-link">
                                            Calculator
                                        </Link>
                                    </li>
                                    <li className="nav-item" >
                                        <Link href="/cart" className="nav-link">
                                            Cart
                                        </Link>
                                    </li>
                                </ul>
                                <form className="form-inline ">
                                    <input className='col-lg-3 ml-4' type="search" placeholder="Search" />
                                    <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
                                </form>
                                <div className="login_btn-contanier ml-0 ml-lg-5">
                                    <a href="">
                                        <img src="images/user.png" alt="" />
                                        <span>
                                            Login
                                        </span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="custom_heading-container ">
                            <h2>
                                Pricing Calculator (Single Product)
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="container layout_padding2">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form_contaier">
                                <form onSubmit={handleSubmit} id='form_data' >
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Free Warranty </label>
                                        <input name='FreeWarranty' type="number" className="form-control" id="exampleInputEmail1" value={0} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputNumber1">Choose Loan Scheme</label>
                                        <select name='scheme' id="inputState" className="form-control">
                                            <option value={"By Loan Term"} >By Loan Term</option>
                                            <option value={"Suggest your Maximum Monthly Rate"} >Suggest your Maximum Monthly Rate</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Loan Term (Years)</label>
                                        <input name='LoanTermVar' type="number" className="form-control" id="exampleInputEmail1" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Equipment Cost ($)</label>
                                        <input name='EquipmentPriceVar' type="text" className="form-control" id="exampleInputName1" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputNumber1">Maintenance Opt Out</label>
                                        <select name='Maintenance' id="inputState" className="form-control">
                                            <option value={"Yes"} >Yes</option>
                                            <option value={"No"} >No</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Terminal Rate (%) </label>
                                        <input name='terminal_rate' type="number" className="form-control" id="exampleInputEmail1" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputNumber1">Insurance Opt Out</label>
                                        <select name='insurance_opt_in' id="inputState" className="form-control">
                                            <option value={"Yes"}>Yes</option>
                                            <option value={"No"} >No</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Extra Warranty (Years) </label>
                                        <input name='ExtraWarranty' type="number" className="form-control" id="exampleInputEmail1" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Business Continuity Opt Out</label>
                                        <select name='BusinessCon' id="inputState" className="form-control">
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className='d-flex justify-content-between' >
                                        <button type="submit" className="">Show</button>
                                        <button onClick={addNewCart} style={{backgroundColor: '#17a2b8', borderColor: '#17a2b8'}} type="button" className="btn btn-success">Add To Cart</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-7">
                            {result && (
                                <div>

                                    <div className='col-lg-12 row' >
                                        <div className='col-lg-4'>
                                            <div className='form-group' data-bs-toggle="tooltip" title="Test Tooltip" >
                                                <label>Total Price with Package ($)</label>
                                                <br />
                                                <h4>{result.results.total_payment}</h4>
                                            </div>
                                            <div className='form-group' >
                                                <label for="">Monthly Repayment ($)</label>
                                                <h4>{result.results.monthlyPayment.toFixed(2)}</h4>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='form-group' >
                                                <label for="">Total Principal ($)</label>
                                                <h4>{result.results.principal.toFixed(2)}</h4>
                                            </div>
                                            <div className='form-group' >
                                                <label for="">Loan Term (Months)</label>
                                                <h4>{parseInt(result.results.loan_term) * 12}</h4>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='form-group' >
                                                <label for="">Total Added Value Services ($)</label>
                                                <h4>{result.results.total_added_value.toFixed(2)}</h4>
                                            </div>
                                            <div className='form-group' >
                                                <label for="">Terminal Value ($)</label>
                                                <h4>{result.results.terminal_value.toFixed(2)}</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card mt-3 mb-3'>
                                        <div className='col-lg-12 m-2' >
                                            <h4 >Detailed Added Value Services Cost</h4>
                                        </div>
                                        <div className='col-lg-12 row'>
                                            <div className='col-lg-4'>
                                                <div className='form-group' data-bs-toggle="tooltip" title="Test Tooltip" >
                                                    <label>Maintenance Fee ($)</label>
                                                    <br />
                                                    <h4>{result.results.maintenance_fee.toFixed(2)}</h4>
                                                </div>
                                                <div className='form-group' >
                                                    <label for="">Travel Labor Cost ($)</label>
                                                    <h4>{result.results.travel_labor_cost.toFixed(2)}</h4>
                                                </div>
                                            </div>
                                            <div className='col-lg-4'>
                                                <div className='form-group' >
                                                    <label for="">Extra Warranty Fee ($)</label>
                                                    <h4>{result.results.warranty_fee.toFixed(2)}</h4>
                                                </div>
                                                <div className='form-group' >
                                                    <label for="">Business Continuity Fee ($)</label>
                                                    <h4>{result.results.business_con_fee.toFixed(2)}</h4>
                                                </div>
                                            </div>
                                            <div className='col-lg-4'>
                                                <div className='form-group' >
                                                    <label for="">Insurance Fee ($)</label>
                                                    <h2>{result.results.insurance_fee}</h2>
                                                </div>
                                                <div className='form-group' >

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            )}
                            <div className='card mt-3 mb-3'>
                                <div className='col-lg-12' >
                                    <div className='m-2' >
                                        <h4>Area Chart</h4>
                                    </div>
                                    {/* Render Chart */}
                                    <Chart
                                        options={chartData.options}
                                        series={chartData.series}
                                        type="area"
                                        height={350}
                                    />
                                </div>
                            </div>
                            <div className='card mt-3 mb-3' >
                                <div className='col-lg-12'>
                                    <div className='m-2' >
                                        <h4>Donut Chart</h4>
                                    </div>
                                    <Chart
                                        options={donutChartData.options}
                                        series={donutChartData.series}
                                        type="donut"
                                    />
                                </div>
                            </div>
                            <div className='table-responsive'>
                                <table className='table table-bordered' >
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Added Value Pyament</th>
                                            <th>Interest Payment</th>
                                            <th>Principal Payment</th>
                                            <th>Remaining Principal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result && result.results2 && result.results2.length > 0 ? (
                                            result.results2.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row["Month"]}</td>
                                                    <td>{row["Added Value Payment"].toFixed(2)}</td>
                                                    <td>{row["Interest Payment"].toFixed(2)}</td>
                                                    <td>{row["Principal Payment"].toFixed(2)}</td>
                                                    <td>{row["Remaining Principal"].toFixed(2)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <div className='row'>
            </div>
        </main>
    );
}
