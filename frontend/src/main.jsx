import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './landing_page/home/HomePage.jsx';
import SignUp from   './landing_page/signup/SignUp.jsx';
import PricingPage from   './landing_page/pricing/PricingPage.jsx';
import ProductPage from   './landing_page/product/ProductPage.jsx';
import SupportPage from   './landing_page/support/SupportPage.jsx';
import AboutPage from   './landing_page/about/AboutPage.jsx';
import Footer from './landing_page/Footer.jsx';
import Navbar from './landing_page/Navbar.jsx';
import NotFound from '../../NotFound.jsx';
import Login from './landing_page/signup/Login.jsx';
import axios from 'axios';


axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/about' element={<AboutPage />}></Route>
      <Route path='/product' element={<ProductPage />}></Route>
      <Route path='/pricing' element={<PricingPage />}></Route>
      <Route path='/support' element={<SupportPage />}></Route>
      <Route path='*' element={<NotFound />}></Route>
      <Route path='/login' element={<Login />} />


    </Routes>
    <Footer />
  </BrowserRouter>
)
