"use client";

import "../styles/css/home.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import Link from 'next/link';


export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const goApiUrl = process.env.NEXT_PUBLIC_URL_BE;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${goApiUrl}/product/products`);
                const data = await response.json();
                setProducts(data); // Menyimpan data produk ke state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {products.length === 0 ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <div className="col-md-4 col-sm-6" style={{marginBottom: "30px"}} key={product.ID}>
                                <div className="card mb-4" style={{height: "100%"}} >
                                    <a className="card-img-tiles" href="#" data-abc="true">
                                        <div className="inner">
                                            <div className="main-img">
                                                <img
                                                    src={product.image}
                                                    alt={product.name_product}
                                                    className="img-fluid"
                                                />
                                            </div>
                                        </div>
                                    </a>
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{product.name_product}</h4>
                                        <p className="text-muted">Starting from $ </p>
                                        <Link className="btn btn-outline-primary btn-sm"
                                            href={{
                                                pathname: '/calculator',
                                                query: {
                                                    id: product.ID,
                                                    price: product.price,
                                                    free_warranty: product.free_warranty
                                                },
                                            }}
                                        >                                             View Products </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
