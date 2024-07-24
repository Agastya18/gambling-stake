import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './style.css'
import React from 'react'
import { useState } from 'react';

const Slider = () => {
    const [value, setValue] = useState([]);
    console.log(value[1])
  return (
    <div>
       <div className="text-white font-mono font-bold text-center mb-10 mt-10">Roll!!</div>
      <RangeSlider
        className="single-thumb"
        defaultValue={[0, 100]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
        
       onInput={(value,index) => setValue(value)}
    
     


      />

<div className="text-center mt-4 bg-white">
        Selected Range: {value[1]}
      </div>
     
    </div>
  )
}

export default Slider


