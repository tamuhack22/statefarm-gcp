import { AnimatePresence } from 'framer-motion';
import React from 'react';
import Header from './Header';
import City from './City';

const Result = (props) => {
    const { level, name } =
    (props.location && props.location.state && props.location.state.apiResponse) || {'level': 2, 'name': props.location.state.apiResponse.name};
    const max_discount = 60
    let discount = max_discount/level;
    discount = Math.round(discount*100)/100
    if(discount===Infinity) discount = 55
    
    return(
        <>
            <Header />
			<City/>
			<AnimatePresence>
                <div className='content-box'>
                    <br></br><br></br><br></br>
                    <h3>Hey {name}, Based on the information,</h3>
                    <br></br>
                    <h1>You are eligible upto a discount of {discount} %</h1>
                </div>
			</AnimatePresence>
        
        </>
    )
}

export default Result;