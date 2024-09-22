"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css'; // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Owl Carousel Theme CSS
import dynamic from 'next/dynamic';
import {useSearchParams} from 'next/navigation'

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const [resultCollection, setResultCollection] = useState(null);
    const searchParams = useSearchParams();
    const [price, setPrice] = useState(searchParams.get('price')); // Initialize state for input
    const [loan_term, setLoanTerm] = useState(2); // Initialize state for input
    const [months_payment, setMonthlyPayment] = useState(0); // Initialize state for input
    const [terminal_rate, setTerminalRate] = useState(0); // Initialize state for input
    const [upfront_payment, setUpfrontPayment] = useState(0); // Initialize state for input
    const [extra_warranty, setExtraWarranty] = useState(2); // Initialize state for input
    const [checkboxes, setCheckboxes] = useState({
        Maintenance: true,
        insurance_opt_in: true,
        BusinessCon: true
    });

    const product_name = searchParams.get('product_name');
    //setPrice(searchParams.get('price')) ;
    const free_warranty = searchParams.get('free_warranty');
    //const price = searchParams.get('price');
    const handleInputChange = (event) => {
        setPrice(event.target.value); // Update state with new input value
    };

    // Handle the change for multiple checkboxes
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;

        // Update the state for the specific checkbox
        setCheckboxes({
            ...checkboxes, // Keep the current state of other checkboxes
            [name]: checked // Update the state of the changed checkbox
        });
    };

    const handleInputChangeLoanTerm = (event) => {
        setLoanTerm(event.target.value); // Update state with new input value
    };

    const handleInputChangeExtraWarranty = (event) => {
        setExtraWarranty(event.target.value); // Update state with new input value
    };
    const handleInputChangeTerminalRate = (event) => {
        setTerminalRate(event.target.value); // Update state with new input value
    };
    const handleInputChangeUpfront = (event) => {
        setUpfrontPayment(event.target.value); // Update state with new input value
    };

    const handleSubmit = async (event) => {
        if (event) event.preventDefault(); // Prevent default if called from submit event

        var formArray = $('#form_data').serializeArray();
        var formData = {};

        formArray.forEach(function (item) {
            var value = isNaN(item.value) ? item.value : parseFloat(item.value);
            formData[item.name] = value;
        });

        // Handle unchecked checkboxes
        $('#form_data input[type="checkbox"]').each(function () {
            if (!this.checked) {
                formData[this.name] = "No";
            }
        });

        formData['FreeWarranty'] = price < 75000 ? 1 : 2;
        formData['EquipmentPriceVar'] = parseInt(price);
        try {
            //const response = await fetch('http://194.233.67.224:5000/set_user_parameters_scheme_1', {
            const response = await fetch('http://localhost:5000/set_user_parameters_scheme_1', {
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
            setMonthlyPayment(result.results.monthlyPayment);
            setChartData({
                series: [
                    {
                        name: 'Interest Payment',
                        data: interestPayments,
                    },
                    {
                        name: 'Principal Payment',
                        data: principalPayments,
                    },
                    {
                        name: 'Added Value Payment',
                        data: addedValuePayment,
                    },
                ],
                options: {
                    chart: {
                        height: 350,
                        type: 'area',
                        stacked: true,
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
                name: 'Interest Payment',
                data: [], //Interest payment
            },
            {
                name: 'Principal Payment',
                data: [], //Principle payment
            },
            {
                name: 'Added Value Payment',
                data: [], //Principle payment
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                stacked: true,
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
            result.results.product_name = formatString(product_name) ;
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
        $(document).ready(function () {
            // Call handleSubmit after a delay of 1 second (1000 milliseconds)
            setTimeout(function () {
                handleSubmit(); // Call handleSubmit without event argument
            }, 1000);

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
        <main>
            <Header />
            <section className="contact_section layout_padding">
                <div className="container">
                    <p style={{color: 'grey', fontWeight: '500'}} >Dental Imagging</p>
                    <div className="">
                        <div className="custom_heading-container ">
                            <h2>
                                {formatString(product_name) || "-"}
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
                                        <label htmlFor="exampleInputNumber1">Choose Loan Scheme</label>
                                        <select name='scheme' id="inputState" className="form-control">
                                            <option value={"By Loan Term"} >By Loan Term</option>
                                            <option value={"Suggest your Maximum Monthly Rate"} >Suggest your Maximum Monthly Rate</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Loan Term (Years)</label>
                                        <input name='LoanTermVar' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeLoanTerm} value={loan_term} />
                                    </div>
                                    <div className='d-flex'>
                                        <div className='col-lg-4 text-center' >
                                            <input className='d-block' type="checkbox" name="Maintenance" id="maintenance" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.Maintenance} onChange={handleCheckboxChange} />
                                            <label for="">Maintenance</label>
                                        </div>
                                        <div className='col-lg-4 text-center' >
                                            <input className='d-block' type="checkbox" name='insurance_opt_in' id="insurance_opt_in" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.insurance_opt_in} onChange={handleCheckboxChange} />
                                            <label for="">Insurance</label>
                                        </div>
                                        <div className='col-lg-4 text-center' >
                                            <input name='BusinessCon' id="BusinessCon" className='d-block' type="checkbox" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.BusinessCon} onChange={handleCheckboxChange} />
                                            <label for="">Business Continuity</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Discount Rate (%) </label>
                                        <input name='discount_rate' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeTerminalRate} value={terminal_rate} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Extra Warranty (Years) </label>
                                        <input name='ExtraWarranty' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeExtraWarranty} value={extra_warranty} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Percentage to Price (%) </label>
                                        <input name='upfront_payment' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeUpfront} value={upfront_payment} />
                                    </div>
                                    <div className='d-flex justify-content-between' >
                                        <button style={{backgroundColor: "#2e77d0"}} type="submit" className="">Calculate</button>
                                        <button onClick={addNewCart} style={{backgroundColor: '#17a2b8', borderColor: '#2e77d0'}} type="button" className="btn btn-success">Add To Cart</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className='row col-lg-12 mt-2' style={{color: 'grey'}} >
                                <div className='col-lg-6'> <h4> Start from </h4> </div>
                                <div className='col-lg-6'> <h4 id="monthlyPaymentId" >$ {months_payment.toFixed(2) || "-"} AUD/months</h4> </div>
                            </div>
                            <div className='row col-lg-12 mb-2' style={{color: 'grey'}} >
                                <div className='col-lg-6'> <h4> Loan term </h4> </div>
                                <div className='col-lg-6'> <h4>{(loan_term || 0) * 12} months</h4> </div>
                            </div>
                            <div className='col-lg-12'>
                                <p style={{color: "grey"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>
                        </div>
                        <div className="col-md-7" style={{display: 'none'}} >
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
            <Footer />
        </main>
    );
}
