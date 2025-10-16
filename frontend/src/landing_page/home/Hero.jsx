import React from 'react';
import "./Hero.css"
import { useNavigate } from 'react-router-dom';

export default function Hero(){
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup'); 
  };

    return(
        <div className='container'>
            <div className="row text-center">
                <div className="img">
                <img src='images/homeHero.png' alt='Hero Image' className='col-8' style={{width: "60%"}}></img>
                </div>
                <h2>Invest in everything</h2>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button className='home-btn btn btn-primary fs-5' onClick={handleSignupClick}>Signup Now</button>
            </div>
        </div>
    )
}