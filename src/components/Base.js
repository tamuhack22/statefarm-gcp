import React from 'react';
import Header from './Header';
import Home from './Home';
import City from './City';
import { AnimatePresence } from 'framer-motion';


function Base(props) {
    const handleOnSubmit = () => {
		props.history.push("/form",{});
	};

	return (
		<>
			<Header />
			<City/>
			<AnimatePresence>
                <Home handleOnSubmit={handleOnSubmit} />
			</AnimatePresence>
			<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/space10-community/conversational-form@1.0.1/dist/conversational-form.min.js" crossorigin></script>
		</>
	);
}

export default Base;
