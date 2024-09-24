"use client";
import Link from 'next/link';
import React, {useState, useEffect} from 'react';

const Header = () => {

    // State untuk mengontrol apakah dropdown terbuka atau tidak
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk toggle dropdown saat tombol diklik
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="home nav-gear">
            <div className='container-home nav-gear'>
                <Link href="/dashboard" className="logo-linkblock w-inline-block w--current" >
                    <img src="https://cdn.prod.website-files.com/66e3eea5994462754c30dea4/66f045959621f07cc15390df_Medigear%20logo-square.png" loading="lazy" alt="" className="logo-title" />
                </Link>
                <div className="menu-link-gear">
                    <Link href="https://medigear.webflow.io/" className="nav-link-gear" >Home</Link>
                    <div className="nav-link-gear dropdown">
                        {/* Tombol dropdown */}
                        <div onClick={toggleDropdown} className="dropbtn w-dropdown-toggle" id="w-dropdown-toggle-0" aria-controls="w-dropdown-list-0" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex="0">
                            <div>
                                Categories <i className='fas fa-angle-down'></i>
                            </div>
                        </div>

                        {/* Konten dropdown */}
                        <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                            <a href="https://medigear.webflow.io/category/lab-equipment" className="w-dropdown-link" tabIndex="0">Lab Equipment</a>
                            <a href="https://medigear.webflow.io/category/sterilization" className="w-dropdown-link" tabIndex="0">Sterilization</a>
                            <a href="https://medigear.webflow.io/category/dental-chair" className="w-dropdown-link" tabIndex="0">Dental Chair </a>
                            <a href="https://medigear.webflow.io/category/plant-room-equipment" className="w-dropdown-link" tabIndex="0">Plant Room Equipment</a>
                            <a href="https://medigear.webflow.io/category/dental-imaging" className="w-dropdown-link" tabIndex="0">Dental Imaging</a>
                            <a href="https://medigear.webflow.io/category/digital-dentistry" className="w-dropdown-link" tabIndex="0">3D Digital Dentistry</a>
                        </div>
                    </div>

                    <Link href="/" className="nav-link-gear" >Contact</Link>
                    <a className="nav-link" href="/cart" data-toggle="modal" data-target="#cartModal" style={{marginLeft: "4vw", marginRight: "2vw"}} >
                        <img src="https://cdn.prod.website-files.com/66e3eea5994462754c30dea4/66e3eea6994462754c30df2a_shopping-cart%20(1).svg" width="20" alt="" className="cart" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
