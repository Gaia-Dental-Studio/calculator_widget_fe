"use client";

import {useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'owl.carousel/dist/assets/owl.carousel.css'; // Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.css'; // Owl Carousel Theme CSS
import Link from 'next/link';


export default function Dashboard() {
    const [carts, setCarts] = useState([]);

    // Inisialisasi cartId
    const initializeCartId = () => {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            cartId = 1;
            localStorage.setItem('cartId', cartId); // Inisialisasi dengan nilai 1
        }
        return parseInt(cartId);
    };

    const getAllCarts = () => {
        const cartId = initializeCartId();  // Ambil cartId terakhir
        const carts = [];

        // Loop untuk mengambil semua cart hingga cartId saat ini
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

    useEffect(() => {
        const allCarts = getAllCarts();
        setCarts(allCarts);

        $(document).ready(function () {
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
                                    <li className="nav-item">
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

            <section className="health_section layout_padding">
                <div className="health_carousel-container">
                    <h2 className="text-uppercase">
                        Medicine & Health

                    </h2>
                    <div className="carousel-wrap layout_padding2">
                        <div className="owl-carousel">
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-1.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-5.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-2.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-5.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-3.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-5.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-4.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-5.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Health
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="health_carousel-container">
                    <h2 className="text-uppercase">
                        Vitamins & Supplements
                    </h2>
                    <div className="carousel-wrap layout_padding2">
                        <div className="owl-carousel owl-2">
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-6.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Medicine
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-6.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Medicine
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-6.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Medicine
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="box">
                                    <div className="btn_container">
                                        <a href="">
                                            Buy Now
                                        </a>
                                    </div>
                                    <div className="img-box">
                                        <img src="images/p-6.jpg" alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <div className="star_container">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                        </div>
                                        <div className="text">
                                            <h6>
                                                Medicine
                                            </h6>
                                            <h6 className="price">
                                                <span>
                                                    $
                                                </span>
                                                30
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <a href="">
                        See more
                    </a>
                </div>
            </section>
        </main>
    );
}
