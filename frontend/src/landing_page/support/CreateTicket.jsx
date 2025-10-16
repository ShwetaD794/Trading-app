import React from 'react';
import './support.css';

export default function CreateTicket(){
    return(
        <div className="container">
            <div className="row">
                <h5 className='ticket-heading'>To create a ticket, select a relevant topic</h5>
                <div className="col-4 topic-links">
                    <h8>Account Opening</h8>
                    <br></br>
                    <a href=''>Resident individual</a>
                    <br></br>
                    <a href=''>Minor</a>
                    <br></br>
                    <a href=''>Non Resident Indian (NRI)</a>
                    <br></br>
                    <a href=''>Company, Partnership, HUF and LLP</a>
                    <br></br>
                    <a href=''>Glossary</a>
                </div>

                <div className="col-4 topic-links">
                    <h8>Your Zerodha Account</h8>
                    <br></br>
                    <a href=''>Your Profile</a>
                    <br></br>
                    <a href=''>Account Modification</a>
                    <br></br>
                    <a href=''>Client Master Report(CMR) and Depository Participant (DP)</a>
                    <br></br>
                    <a href=''>Nomination</a>
                    <br></br>
                    <a href=''>Transfer and conversion of securities</a>
                </div>

                <div className="col-4 topic-links">
                    <h8>Kite</h8>
                    <br></br>
                    <a href=''>IPO</a>
                    <br></br>
                    <a href=''>Trading FAQs</a>
                    <br></br>
                    <a href=''>Margin Trading Facility (MTF) and Margins</a>
                    <br></br>
                    <a href=''>Charts and orders</a>
                    <br></br>
                    <a href=''>Alerts and Nudges</a>
                    <br></br>
                    <a href=''>General</a>
                </div>

                <div className="col-4 topic-links">
                    <h8>Funds</h8>
                    <br></br>
                    <a href=''>Add money</a>
                    <br></br>
                    <a href=''>Withdraw money</a>
                    <br></br>
                    <a href=''>Add bank accounts</a>
                    <br></br>
                    <a href=''>eMandates</a>
                </div>

                <div className="col-4 topic-links">
                    <h8>Console</h8>
                    <br></br>
                    <a href=''>Portfolio</a>
                    <br></br>
                    <a href=''>Corporate actions</a>
                    <br></br>
                    <a href=''>Funds statement</a>
                    <br></br>
                    <a href=''>Reports</a>
                    <br></br>
                    <a href=''>Profile</a>
                    <br></br>
                    <a href=''>Segments</a>
                </div>

                <div className="col-4 topic-links">
                    <h8>Coin</h8>
                    <br></br>
                    <a href=''>Mutual Funds</a>
                    <br></br>
                    <a href=''>National Pension Scheme (NPS)</a>
                    <br></br>
                    <a href=''>Features on Coin</a>
                    <br></br>
                    <a href=''>Payments and Orders</a>
                    <br></br>
                    <a href=''>General</a>
                </div>
            </div>
        </div>
    )
}