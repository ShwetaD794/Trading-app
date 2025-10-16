import React from 'react';
import { useNavigate} from 'react-router-dom';

export default function OpenAcc(){
    const navigate = useNavigate();
    
    const handleSignupClick = () => {
        navigate('/signup'); 
    };
    return(
        <div className='container'>
            <div className="row text-center">
                <h2>Open a Zerodha account</h2>
                <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                </p>
                <button className='home-btn btn btn-primary fs-5'onClick={handleSignupClick}>Signup Now</button>
            </div>
        </div>
    )
}