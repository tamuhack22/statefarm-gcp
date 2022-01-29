import React from 'react'
import Lottie from 'react-lottie';
import animationData from './animations/city.json'
 
export default class City extends React.Component {
 
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };

    return (
        <div style={{zIndex: -10, position: 'absolute'}}>
            <Lottie
            options={defaultOptions}
            height={700}
            width={window.width}
            />
        </div>
    );
  }
}