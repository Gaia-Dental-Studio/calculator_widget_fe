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

    // State untuk mengatur apakah modal terbuka atau tidak
    const [showModal, setShowModal] = useState(false);

    const [showModalAlert, setShowModalAlert] = useState(false);

    // Fungsi untuk membuka modal
    const openModal = () => setShowModal(true);

    const openModalAlert = () =>{
        setShowModalAlert(true);
    }; 

    // Fungsi untuk menutup modal
    const closeModal = () => setShowModal(false);
    const closeModalAlert = () => setShowModalAlert(false);

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
        const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' }; 

        let dataPost = {
            "fields": {
            }
        };

        const personalForm = $('#personal_form').serializeArray();
        personalForm.forEach(function (item) {
            dataPost.fields[item.name] = item.value;
        });

        const getData = getAllCarts();
        let totaladdedValuePayment = 0;
        let totalaPrincipal = 0;
        let totalaMonthlyPayment = 0;
        for (let i = 0; i < getData.length; i++) {
            let index = i + 1;
            dataPost.fields['Product name ' + index] = formatString(getData[i].results.product_name) ;
            dataPost.fields['Loan Term ' + index] = getData[i].results.loan_term;
            dataPost.fields['Monthly Payment ' + index] = getData[i].results.monthlyPayment;
            dataPost.fields['Upfront Payment ' + index] = getData[i].results.upfront_payment;
            dataPost.fields['Upfront Payment Value ' + index] = getData[i].results.total_upfront;
            dataPost.fields['Total Principal ' + index] = getData[i].results.principal;
            dataPost.fields['Maintenance Fee ' + index] = getData[i].results.maintenance_fee;
            dataPost.fields['Insurance Fee ' + index] = getData[i].results.insurance_fee;
            dataPost.fields['Business Cont. Fee ' + index] = getData[i].results.business_con_fee;
            dataPost.fields['Travel Labor Cost ' + index] = getData[i].results.travel_labor_cost;
            dataPost.fields['Extra Warranty ' + index] = getData[i].results.warranty_fee;
            dataPost.fields['Total Added Value ' + index] = getData[i].results.total_added_value;
            dataPost.fields['Total Package ' + index] = 0;
            dataPost.fields['Terminal Value ' + index] = getData[i].results.terminal_value;
            //dataPost.fields['Interest Rate ' + index] = getData[i].results.terminal_value;
        }

        dataPost.fields['Agreement Date'] = today.toLocaleDateString('en-US', options); //buatkan format di ambil dari hari ini seperti tanggal hari ini  "September 5, 2024";

        console.log("show me all data => ", dataPost);
        openModalAlert();
        closeModal();
        return;
        try {
            const response = await fetch('https://api.airtable.com/v0/appLCog6dSk4upByJ/tbltavHX2g986PzHL', {
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

{/* Modal */}
            {showModalAlert && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-fade-in-down" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"></h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                <div className="modal-body" >
<div class="thank-you-pop">
							<img src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png" alt=""/>
							<h1>Thank You!</h1>
							<p>Your submission is received and we will contact you soon</p>
							<h3 class="cupon-pop">Your Id: <span>12345</span></h3>
							
 						</div>
                </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop untuk modal */}
            {showModalAlert && <div className="modal-backdrop fade show"></div>}



            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-fade-in-down" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Personal data</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} id="personal_form" >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="exampleFormControlInput1">Full Name</label>
                                        <input name="Full Name" type="text" className="form-control" id="exampleFormControlInput1" placeholder="" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Email address</label>
                                        <input name="Email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Phone Number</label>
                                        <input name="Phone Number" type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1">Address</label>
                                        <textarea name="Address" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save changes
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop untuk modal */}
            {showModal && <div className="modal-backdrop fade show"></div>}

            <Header />
            <div className="container mt-5 p-3 rounded cart">
                <div className="row no-gutters" id="content">
                    <div className="col-md-8">
                        <div className="product-details mr-2">
                            <div className="d-flex flex-row align-items-center">
                                <a style={{display: "contents"}} href="https://medigear.webflow.io/shop">
                                    <i className="fa fa-arrow-left"></i>
                                    <span className="ml-2">Continue Shopping</span>
                                </a>
                            </div>
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
                                            ${formatNumber(cart.results.monthlyPayment)}/month
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
                                    ${formatNumber(totalCarts.length > 0 ? totalCarts[0]["Total Payment"] : 0)}/month
                                </span>
                            </div>
                            {/* onClick={handleSubmit} */}
                            <button onClick={openModal} style={{backgroundColor: '#2e77d0', color: 'white'}} className="text-center btn btn-block mt-3" type="button" data-toggle="modal" data-target="#exampleModal">
                                <span>Purchase  <i className="fa fa-long-arrow-right ml-1"></i>
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
