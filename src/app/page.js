"use client";

import "../styles/css/home.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import Link from 'next/link';


export default function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v0.0.1/get-products'); // Ganti dengan URL API sebenarnya
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
                            <div className="col-md-4 col-sm-6" style={{marginBottom: "30px"}}  key={product.ID}>
                                <div className="card mb-4" style={{height:"100%"}} >
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
                                        <a className="btn btn-outline-primary btn-sm" href="#" data-abc="true">
                                            View Products
                                        </a>
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
