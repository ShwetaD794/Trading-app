import React from 'react';
import "./Stats.css";

export default function Stats(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h2>Trust with confidence</h2>
                    <br></br>
                    <h5>Customer-first always</h5>
                    <p>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>
                    <h5>No spa5 or gimmicks</h5>
                    <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies. </p>
                    <h5>The Zerodha universe</h5>
                    <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    <h5>Customer-first alwaysDo better with money</h5>
                    <p>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className="col-6 image">
                    <img src='images/ecosystem.png'></img>
                    <div className='links'>
                        <a href=''>Explore our products  <i class="fa-solid fa-arrow-right"></i></a>
                        <a href=''>Try Kite demo<i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            <div className="logos">
            <img src='images/pressLogos.png'></img>
            </div>
        </div>
    )
}