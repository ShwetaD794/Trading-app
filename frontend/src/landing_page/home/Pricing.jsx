import React from 'react';
import "./Pricing.css";

export default function Pricing(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-5 price">
                    <h2 className='mb-5'>Unbeatable pricing</h2>
                    <p className='mt-3'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href=''>See pricing  <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="col-6">
                <div className="row">
                    <div className="col d-flex align-items-center tags" >
                    <img src="images/pricing.svg" alt="Pricing"/>
                    <p className="mb-0">Free account opening</p>
                    </div>

                    <div className="col d-flex align-items-center tags">
                    <img src="images/pricing2.svg" alt="Pricing 2"/>
                    <p className="mb-0">Second feature</p>
                    </div>

                    <div className="col d-flex align-items-center tags">
                    <img src="images/pricing3.svg" alt="Pricing 3" />
                    <p className="mb-0">Third feature</p>
                    </div>
                </div>
                   
                </div>
            </div>
        </div>
    )
}