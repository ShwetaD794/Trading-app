import React from 'react';

export default function Rightimage({imageURL, prodName, prodDescription, link}){
    return(
        <div className="container">
            <div className="row">
                <div className="col-6 kite-info">
                    <h3>{prodName}</h3>
                    <p>{prodDescription}</p>
                    <div>
                        <a href={link} style={{textDecoration: "none"}}>{link}</a>
                    </div>
                </div>
                <div className="col-6">
                    <img src={imageURL} className='kite-img'></img>
                </div>
            </div>
        </div>
    )
}