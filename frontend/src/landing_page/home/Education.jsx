import React from 'react';

export default function Education(){
    return(
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <img src='images/education.svg' width={"100%"}></img>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                    <h2>Free and open market education</h2>
                    <p className='mt-5'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href=''>Varsity →</a>
                    <p className='mt-5'>Trading Q&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href=''>TradingQ&A →</a>
                </div>
            </div>
        </div>
    )
}