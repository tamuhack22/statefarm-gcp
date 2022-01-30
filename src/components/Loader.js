import React from 'react'
import Lottie from 'react-lottie';
import animationData from './animations/loading.json'
 
export default class Loader extends React.Component {
 
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };

    return (
        <div style={{ width: '100vw', zIndex: -10, position: 'absolute'}}>
            <Lottie
            options={defaultOptions}
            height={300}
            width={window.width}
            />
			<h1>Loading ...</h1>
        </div>
    );
  }
}