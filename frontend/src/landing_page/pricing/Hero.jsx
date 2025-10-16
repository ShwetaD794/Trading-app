import React from 'react';
import './pricing.css';

export default function Hero(){
    return(
        <div className="container">
            <div className="row text-center price">
                <div className="intro">
                    <h1>Charges</h1>
                <p>List of all charges and taxes</p>
                </div>
                <div className="col-4">
                    <img src='images/pricingEquity.svg'></img>
                    <h4>Free equity delivery</h4>
                    <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col-4">
                    <img src='images/intradayTrades.svg'></img>
                    <h4>Intraday and F&O trades</h4>
                    <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col-4">
                    <img src='images/pricingEquity.svg'></img>
                    <h4>Free direct MF</h4>
                    <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    )
}