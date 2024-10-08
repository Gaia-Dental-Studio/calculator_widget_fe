"use client";

import "../../../styles/css/cart.css";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import {useEffect} from 'react';
import {useState} from 'react';
import Link from 'next/link';


export default function ProductsList() {
    const goApiUrl = process.env.NEXT_PUBLIC_URL_BE;
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // State untuk produk yang diklik
    const [formData, setFormData] = useState({
        id: '',
        name_product: '',
        category: '',
        image: '',
        description: '',
        price: '',
        free_warranty: '',
        document: ''
    });

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            id: product.ID,
            name_product: product.name_product,
            category: product.category,
            price: product.price,
            free_warranty: product.free_warranty,
            description: product.description,
            //document: product.document,
            //image: product.image
        });

        console.log("show prod " ,selectedProduct );

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('Updated product data:', formData);

        const formDataUpdate = new FormData();
        formDataUpdate.append('name_product', formData.name_product);
        formDataUpdate.append('image', formData.image);
        formDataUpdate.append('description', formData.description);
        formDataUpdate.append('category', formData.category);
        formDataUpdate.append('pdf', formData.document);
        formDataUpdate.append('price', formData.price);
        formDataUpdate.append('free_warranty', formData.free_warranty);
        console.log("form", formDataUpdate);
//return;
        const response = await fetch(`${goApiUrl}/product/update?id=${formData.id}`, {
            method: 'PUT',
            body: formDataUpdate,
        });

        if (response.ok) {
            const result = await response.text();
            alert(result); // Show success message
        } else {
            alert('Error Update Data');
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


    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${goApiUrl}/product/delete?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                // Handle HTTP errors
                throw new Error('Failed to delete product');
            }

            const data = await response.json();
            alert(data.message || 'Product successfully deleted');  // Assuming server sends a message

            fetchProducts();  // Re-fetch products after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('An error occurred while deleting the product');
        }
    };


    const formatNumber = (number) => {
        const roundedNumber = Math.round(number || 0);

        return roundedNumber.toLocaleString('en-US');
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${goApiUrl}/product/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchProducts();

        console.log("list", products);
    }, []);

    return (
        <main>
            <Header />
            <div className="row col-lg-12">
                <div className="col-lg-7">
                    <div className="product-details mr-2">
                        <div className="d-flex flex-row align-items-center">
                            <a style={{display: "contents"}} href="https://medigear.webflow.io/shop">
                                <i className="fa fa-arrow-left"></i>
                                <span className="ml-2"></span>
                            </a>
                        </div>
                        <hr />
                        <h6 className="mb-0">List Product</h6>
                        <div className="d-flex justify-content-between">
                            <span>You have {products.length || 0} List Product</span>
                            <div className="d-flex flex-row align-items-center">
                                <span className="text-black-50"></span>
                                <div className="price ml-2">
                                    <span className="mr-1"></span>
                                    <i className=""></i>
                                </div>
                            </div>
                        </div>
                        {products.map((cart, index) => (
                            <div
                                key={index}
                                onClick={() => handleProductClick(cart)} // Menangani klik elemen
                                style={{cursor: 'pointer'}}
                                className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded"
                            >
                                <div className="d-flex flex-row">
                                    <div className="img-items" width="40" >
                                        <img src={`${cart.image || ""}`} alt="" />
                                    </div>
                                    <div className="ml-2">
                                        <span className="font-weight-bold d-block">
                                            {formatString(cart.name_product)}
                                        </span>
                                        <span className="spec">
                                            {cart.category || ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="d-block">
                                        {/* {cart.loan_term * 12} Months */}
                                    </span>
                                    <span className="d-block ml-5 font-weight-bold">
                                        ${formatNumber(cart.price)}/month
                                    </span>
                                    <i
                                        onClick={() => {
                                            // Display confirmation dialog
                                            if (window.confirm("Are you sure you want to delete this product?")) {
                                                deleteProduct(cart.ID); // Proceed with deletion if confirmed
                                            }
                                        }}
                                        data-key={cart.ID}
                                        style={{cursor: 'pointer'}}
                                        className="fa fa-trash-alt ml-3 text-black-50">
                                    </i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-5">
                    {/* Card yang ditampilkan ketika elemen diklik */}
                    {selectedProduct && (
                        <div className="card mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Edit Product</h5>
                                <form onSubmit={handleSubmit} id="update_form">
                                    <div className="form-group">
                                        <label htmlFor="name_product">Product Name</label>
                                        <input
                                            type="text"
                                            id="name_product"
                                            name="name_product"
                                            value={formData.name_product}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image</label>

                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                            className="form-control"
                                            accept="image/*"
                                        />
                                        <img className="mt-1" style={{maxWidth: '17vw'}} src={selectedProduct.image} alt="" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="document">Document</label>

                                        <input
                                            type="file"
                                            id="document"
                                            name="document"
                                            onChange={(e) => setFormData({...formData, document: e.target.files[0]})}
                                            className="form-control"
                                            accept="pdf"
                                        />
                                        <a className="ml-2" style={{fontStyle: "italic", fontWeight: "lighter"}} href={selectedProduct.document} target="_blank">See Document</a>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-control"
                                            forma
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Free Warranty</label>
                                        <input
                                            type="text"
                                            id="free_warranty"
                                            name="free_warranty"
                                            value={formData.free_warranty}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
