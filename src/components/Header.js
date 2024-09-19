"use client";
import Link from 'next/link';

const Header = () => {
    return (
        <div className="home nav-gear">
            <div className='container-home nav-gear'>
                <Link href="/dashboard" className="logo-inline-block" >
                    <img className='logo-title' src="images/medigear-logo.png" alt="logo-title" />
                </Link>
                <div class="menu-link-gear">
                    <Link href="https://medigear.webflow.io/" className="nav-link-gear" >Home</Link>
                    <Link href="/shop" className="nav-link-gear" >Shop</Link>
                    <Link href="/" className="nav-link-gear" >Contact</Link>
                    <a class="nav-link" href="/cart" data-toggle="modal" data-target="#cartModal" style={{marginLeft:"5vw", marginRight:"1vw"}} >
                        <img src="https://cdn.prod.website-files.com/66e3eea5994462754c30dea4/66e3eea6994462754c30df2a_shopping-cart%20(1).svg" width="20" alt="" class="cart" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
