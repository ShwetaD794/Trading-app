import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Pricing from './Pricing';
import Education from './Education';
import Stats from './Stats';
import OpenAcc from '../OpenAcc';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function HomePage(){
    return(
        <>
        <Hero />
        <Awards />
        <Stats />
        <Pricing />
        <Education />
        <OpenAcc />
        </>
    )
}