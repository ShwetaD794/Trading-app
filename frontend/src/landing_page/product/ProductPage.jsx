import React from 'react';
import Hero from './Hero';
import Leftimage from './Leftimage';
import Rightimage from './Rightimage';
import Universe from './Universe';

export default function ProductPage(){
    return(
        <>
        <Hero />

        <Leftimage 
        imageURL="images/kite.png" 
        prodName="Kite" 
        prodDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." 
        tryDemo="tryDemo →" 
        learnmore="learnmore →"
        googlePlay="googlePlay" 
        appStore="appStore"/>

        <Rightimage
        imageURL="images/console.png" 
        prodName="Console" 
        prodDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations." 
        link="learnmore →" 
        />

        <Leftimage 
        imageURL="images/coin.png" 
        prodName="Coin" 
        prodDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." 
        tryDemo="" 
        learnmore=""
        googlePlay="" 
        appStore=""/>

        <Rightimage
        imageURL="images/kiteconnect.png" 
        prodName="Kite Connect API" 
        prodDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." 
        link="kite Connect →" 
        />

        <Leftimage 
        imageURL="images/varsity.png" 
        prodName="Varsity mobile" 
        prodDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." 
        tryDemo="" 
        learnmore=""
        googlePlay="" 
        appStore=""/>

        <p className='text-center mt-5'>Want to know more about our technology stack? Check out the <a href='' style={{textDecoration:"none"}}>Zerodha.tech</a> blog.</p>

        <Universe />
        </>
    )
}