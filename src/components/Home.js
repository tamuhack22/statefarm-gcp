import React from 'react';
import { motion } from 'framer-motion';
import Foot from './Foot'
// import './styles/base.css';

const buttonVariants = {
	hover: {
		scale: 1.1,
		textShadow: '0px 0px 8px rgb(255, 255, 255)',
		boxShadow: '0px 0px 8px rgb(255, 255, 255)',
		transition: {
			duration: 0.3,
			yoyo: Infinity,
			// yoyo: 10, // key frames to scale 1 to 1.1 for 10 times
		},
	},
};

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delay: 1.5,
			duration: 1.5,
		},
	},

	exit: {
		x: '-100vw',
		transition: {
			ease: 'easeInOut',
		},
	},
};


const Home = (props) => {
	return (
		<motion.div
			className='home container'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<h2>Cut your Health Insurance</h2>
			<div onClick={()=>props.handleOnSubmit()}>
				<motion.button variants={buttonVariants} whileHover='hover' >
					Check our Prices
				</motion.button>
			</div>
            <Foot/>
			
		</motion.div>
	);
};

export default Home;
