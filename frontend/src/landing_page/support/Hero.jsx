import React from 'react';
import './support.css';

export default function Hero(){
    return(
        <div className="support-container">
            <div className="row supportWrapper">
                <div className="col-6">
                    <h5 className='left'>support Portal</h5>
                    <p>
                        Search for an answer or browse help topics to create a ticket
                    </p>
                    <div className="search-input">
                        <input type='text' placeholder='Eg: how do i activate F&O, why is my order getting rejected...' ></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="support-links">
                        <div className="link">
                            <a href=''>Track account opening</a>
                            <a href=''>Track segment activation</a>
                            <a href=''>Intraday margins</a>
                        </div>
                        <div className="link">
                        <a href=''>Kite user manual</a>
                        </div>
                    </div>
                </div>
                <div className="col-6 features">
                    <a href='' className='right'>Track tickets</a>
                    <h5>Featured</h5>
                    <a href=''>1. Surveillance measure on scrips - June 2025</a>
                    <br></br>
                    <a href=''>2. Offer for sale (OFS) – June 2025</a>
                </div>
                </div>
        </div>
    )
}