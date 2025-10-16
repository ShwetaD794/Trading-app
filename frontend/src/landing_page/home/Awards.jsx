import React from 'react';
import "./Awards.css";

export default function Awards(){
    return(
            <div className="container mb-5" >
                <div className="row">
                    <div className="col-6 image">
                        <img src='images/largestBroker.svg'></img>
                    </div>
                    <div className="col-6 p-10 mt-3 ">
                        <h2>Largest stock broker in India</h2>
                        <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all volumes in India daily by trading and investing in:</p>
                        <div className="row">
                            <div className="col-6">
                                <ul>
                                    <li><p>Futures and Options</p></li>
                                    <li><p>Commodity derivatives</p></li>
                                    <li><p>Currency derivatives</p></li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul>
                                    <li><p>Stacks & IPOs</p></li>
                                    <li><p>Direct mutual funds</p></li>
                                    <li><p>Bonds and Govt. Securities</p></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}