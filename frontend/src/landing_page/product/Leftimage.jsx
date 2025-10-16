import React from 'react';

export default function Leftimage({imageURL, prodName, prodDescription, tryDemo, learnmore,googlePlay, appStore}){
    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <img src={imageURL} className='kite-img'></img>
                </div>
                <div className="col-6 kite-info">
                    <h3>{prodName}</h3>
                    <p>{prodDescription}</p>
                    <div className='kite-links'>
                        <a href={tryDemo}>Try Demo →</a>
                    <a href={learnmore}>Learn More →</a>
                    </div>
                    <div className='kite-links'>
                    <a href={googlePlay}><img src='images/googlePlayBadge.svg'></img></a>
                    <a href={appStore}><img src='images/appstoreBadge.svg'></img></a>
                    </div>
                </div>
            </div>
        </div>
    )
}