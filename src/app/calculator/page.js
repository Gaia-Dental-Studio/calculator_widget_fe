"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import {useSearchParams} from 'next/navigation';

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const searchParams = useSearchParams();
    const [price, setPrice] = useState(searchParams.get('price'));
    const [loan_term, setLoanTerm] = useState(2);
    const [months_payment, setMonthlyPayment] = useState(0);
    const [terminal_rate, setTerminalRate] = useState(0);
    const [upfront_payment, setUpfrontPayment] = useState(0);
    const [extra_warranty, setExtraWarranty] = useState(2);
    const [checkboxes, setCheckboxes] = useState({
        Maintenance: true,
        insurance_opt_in: true,
        BusinessCon: true
    });
    const [productData, setProductData] = useState({});

    const product_name = searchParams.get('product_name');
    const free_warranty = searchParams.get('free_warranty');
    const handleInputChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;

        setCheckboxes({
            ...checkboxes,
            [name]: checked
        });
    };

    const handleInputChangeLoanTerm = (event) => {
        setLoanTerm(event.target.value);
    };

    const handleInputChangeExtraWarranty = (event) => {
        setExtraWarranty(event.target.value);
    };
    const handleInputChangeTerminalRate = (event) => {
        setTerminalRate(event.target.value);
    };
    const handleInputChangeUpfront = (event) => {
        setUpfrontPayment(event.target.value);
    };

    const handleSubmit = async (event) => {
        if (event) event.preventDefault();

        var formArray = $('#form_data').serializeArray();
        var formData = {};

        formArray.forEach(function (item) {
            var value = isNaN(item.value) ? item.value : parseFloat(item.value);
            formData[item.name] = value;
        });

        $('#form_data input[type="checkbox"]').each(function () {
            if (!this.checked) {
                formData[this.name] = "No";
            }
        });

        formData['FreeWarranty'] = price < 75000 ? 1 : 2;
        formData['EquipmentPriceVar'] = parseInt(price);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_URL_MODEL;
            const response = await fetch(`${apiUrl}`, {
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
            setUpfrontPayment(result.results.total_upfront);
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
            localStorage.setItem('cartId', cartId);
        }
        return parseInt(cartId);
    };

    const incrementCartId = () => {
        let cartId = localStorage.getItem('cartId');
        cartId = parseInt(cartId) + 1;
        localStorage.setItem('cartId', cartId);
        return cartId;
    };

    const addNewCart = () => {
        try {
            result.results.product_name = productData.name_product;
            result.results.product_image = productData.image;
            result.results.product_category = productData.category;
            const cartId = initializeCartId();
            localStorage.setItem(`cart${cartId}Results`, JSON.stringify(result.results));
            localStorage.setItem(`cart${cartId}Results2`, JSON.stringify(result.results2));

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

    const formatNumber = (number) => {
        // Round the number to the nearest integer
        const roundedNumber = Math.round(number || 0);

        // Format the number with commas for thousands separator
        return roundedNumber.toLocaleString('en-US');
    }

    useEffect(() => {

        const idProduct = searchParams.get('id');

        const fetchProductById = async () => {
            try {

                const apiUrlBe = process.env.NEXT_PUBLIC_URL_BE;
                const response = await fetch(`${apiUrlBe}/api/v0.0.1/get-product?id=${idProduct}`);
                const data = await response.json();
                setProductData(data);
                setPrice(data.price);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductById();

        $(document).ready(function () {
            // Call handleSubmit after a delay of 1 second (1000 milliseconds)
            setTimeout(function () {
                handleSubmit(); // Call handleSubmit without event argument
            }, 1000);

        });

    }, []);

    return (
        <main>
            <Header />
            <section className="contact_section layout_padding">
                <div className="container">
                    <p style={{color: 'grey', fontWeight: '500'}} > {productData.category || ""}  </p>
                    <div className="">
                        <div className="custom_heading-container ">
                            <h2>
                                {formatString(productData.name_product) || "-"}
                            </h2>
                        </div>

                    </div>
                </div>
                <div className="container layout_padding2" style={{maxWidth: "90vw"}}>
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
                                    <div className="form-group" style={{display: 'block'}} >
                                        <label htmlFor="exampleInputEmail1">Upfront Payment (%) </label>
                                        {/*   <input  type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeUpfront} value={upfront_payment} /> */}
                                        <select className='form-control' id="" name='upfront_payment'>
                                            <option value="0">0%</option>
                                            <option value="10">10%</option>
                                            <option value="15">15%</option>
                                            <option value="20">20%</option>
                                        </select>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-3 text-center' >
                                            <input className='d-block' type="checkbox" name="Maintenance" id="maintenance" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.Maintenance} onChange={handleCheckboxChange} />
                                            <label for="">Maintenance</label>
                                        </div>
                                        <div className='col-lg-3 text-center' >
                                            <input className='d-block' type="checkbox" name='insurance_opt_in' id="insurance_opt_in" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.insurance_opt_in} onChange={handleCheckboxChange} />
                                            <label for="">Insurance</label>
                                        </div>
                                        <div className='col-lg-3 text-center' >
                                            <input name='BusinessCon' id="BusinessCon" className='d-block' type="checkbox" style={{margin: "0 auto"}} value={"Yes"} checked={checkboxes.BusinessCon} onChange={handleCheckboxChange} />
                                            <label for="">Business Continuity</label>
                                        </div>
                                        <div className='col-lg-3 text-center' >
                                            <a target='_blank' href={`/desc_product/Added-Value-Services.pdf`} >See Detail</a>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{display: 'none'}} >
                                        <label htmlFor="exampleInputEmail1">Discount Rate (%) </label>
                                        <input name='discount_rate' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeTerminalRate} value={terminal_rate} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Extra Warranty (Years) </label>
                                        <input name='ExtraWarranty' type="number" className="form-control" id="exampleInputEmail1" onChange={handleInputChangeExtraWarranty} value={extra_warranty} />
                                    </div>
                                    <div className='row' >
                                        <button style={{backgroundColor: "#2e77d0"}} type="submit" className="">Calculate</button>
                                        <a target='_blank' href={`${process.env.NEXT_PUBLIC_URL_BE}/${productData.document || ""}`} style={{display: "contents"}} >
                                            <button className="btn btn-success" style={{backgroundColor: "#f45252", width: "100%"}} type="button">Product Description</button>
                                        </a>
                                        <button onClick={addNewCart} style={{backgroundColor: '#17a2b8', borderColor: '#2e77d0'}} type="button" className="btn btn-success">Add To Cart</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className='text-center ' >
                                <div className='img-items-calculator'>
                                    {/*checkImage(product_name)*/}
                                    <img src={`${process.env.NEXT_PUBLIC_URL_BE}/${productData.image || ""}`} alt="" />
                                </div>
                            </div>
                            <div className='row col-lg-12 mt-4' style={{color: 'grey'}} >
                                <div className='col-lg-6'> <h4> Start from </h4> </div>
                                <div className='col-lg-6'> <h4 id="monthlyPaymentId" >$ {formatNumber(months_payment)} AUD/months</h4> </div>
                            </div>
                            <div className='row col-lg-12 mb-2' style={{color: 'grey'}} >
                                <div className='col-lg-6'> <h4> Loan term </h4> </div>
                                <div className='col-lg-6'> <h4>{(loan_term || 0) * 12} months</h4> </div>
                            </div>
                            <div className='row col-lg-12 mb-2' style={{color: 'grey'}} >
                                <div className='col-lg-6'> <h4> Upfront payment </h4> </div>
                                <div className='col-lg-6'> <h4>${formatNumber(upfront_payment)}</h4> </div>
                            </div>
                            {/* 
            <div className='col-lg-12'>
                                <div style={{fontSize: '14px', color: 'grey'}} className='mt-4' >
                                    <label style={{fontWeight: 'bold', fontSize: '14px'}} >Product Description </label>
                                    {checkDesc(product_name)}
                                </div> 
                            </div>

            */}
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
