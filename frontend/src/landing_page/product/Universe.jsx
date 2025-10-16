import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Universe(){
    const navigate = useNavigate();
    
    const handleSignupClick = () => {
        navigate('/signup'); 
    };
    return(
        <div className="container">
            <div className="row text-center universe-logos">
                <h3>The Zerodha Universe</h3>
                <p className='universe-info'>Extend your trading and investment experience even further with our partner platforms</p>
                <div className="col-4 p-3">
                    <img src="images/zerodhafundhouse.png"></img>
                    <p>Our asset     management venture
                        that is creating simple and transparent index
                        funds to help you save for your goals.
</p>
                </div>
                <div className="col-4 p-3">
                    <img src="images/sensibull-logo.svg"></img>
                    <p>
                        Options trading platform that lets you
                        create strategies, analyze positions, and examine
                        data points like open interest, FII/DII, and more.


                    </p>
                </div>
                <div className="col-4 p-3">
                    <img src="images/tijori.svg"></img>
                    <p>
                        Investment research platform
                        that offers detailed insights on stocks,
                        sectors, supply chains, and more.

                    </p>
                </div>
                <div className="col-4 p-3">
                    <img src="images/streak-logo.png"></img>
                    <p>
                        Systematic trading platform
                        that allows you to create and backtest
                        strategies without coding.
                    </p>
                </div>
                <div className="col-4 p-3">
                    <img src="images/smallcaseLogo.png"></img>
                    <p>
                        Thematic investing platform
                        that helps you invest in diversified
                        baskets of stocks on ETFs.
                    </p>
                </div>
                <div className="col-4 p-3">
                    <img src="images/ditto-logo.png"></img>
                    <p>
                        Personalized advice on life
                        and health insurance. No spam
                        and no mis-selling.
                        Sign up for free
                    </p>
                </div>
                <button className='universe-btn' onClick={handleSignupClick}>Signup for free</button>
                
            </div>
        </div>
    )
}