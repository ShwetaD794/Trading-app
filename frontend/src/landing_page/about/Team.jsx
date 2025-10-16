import React from 'react';
import "./about.css";

export default function Team(){
    return(
        <div className="container">
            <div className="row">
                <h3 className='text-center'>People</h3>
            </div>
            <div className="row founder">
                <div className="col-6 text-center">
                    <img src='images/nithinKamath.jpg' style={{borderRadius: "100%", width: "50%", marginTop: "8%"}}></img>
                    <h6 className='mt-4'>Nithin Kamath</h6>
                    <h7>Founder, CEO</h7>
                </div>
                <div className="col-6 about-people">
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p>

                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>

                    <p>Playing basketball is his zen.</p>

                    <p>Connect on <a href=''>Homepage</a> / <a href=''>TradingQnA</a> / <a href=''>Twitter</a></p>
                </div>
            </div>
            <div className="row members">
                <div className="col-4">
                    <img src='images/Nikhil.jpg' className='member'></img>
                    <h6 className='mt-4'>Nikhil Kamath</h6>
                    <h7>Co-Founder, CFO</h7>
                </div>
                <div className='col-4'>
                    <img src='images/Kailash.jpg' className='member'></img>
                   <h6 className='mt-4'>Dr. Kailash Nadh</h6>
                    <h7>CTO</h7>
                </div>
                <div className="col-4">
                    <img src='images/Venu.jpg' className='member'></img>
                    <h6 className='mt-4'>Venu Madhav</h6>
                    <h7>COO</h7>
                </div>
                <div className='col-4'>
                    <img src='images/Hanan.jpg' className='member'></img>
                    <h6 className='mt-4'>Hanan Delvi</h6>
                    <h7>COO</h7>
                </div>
                <div className='col-4'>
                    <img src='images/Seema.jpg' className='member'></img>
                    <h6 className='mt-4'>Semma Patil</h6>
                    <h7>Director</h7>
                </div>
                <div className='col-4'>
                    <img src='images/Karthik.jpg' className='member'></img>
                    <h6 className='mt-4'>Karthik Rangappa</h6>
                    <h7>Chief of Education</h7>
                </div>
                <div className='col-4'>
                    <img src='images/Austin.jpg' className='member'></img>
                    <h6 className='mt-4'>Austin Prakesh</h6>
                    <h7>Director Strategy</h7>
                </div>
                
            </div>
        </div>
    )
}