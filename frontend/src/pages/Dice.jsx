import Toss from "../components/Toss"
import Slider from "../components/Slider"
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../components/style.css';
import { useState } from 'react';
const Dice = () => {
  const [value, setValue] = useState([]);
    console.log(value[1])
  return (
    <div className="bg-gray-900 min-h-screen ">
      <h1 className="text-3xl text-center text-white ">Dice</h1>
     
  <div className="flex w-full flex-col lg:flex-row ">
  <div className="card bg-gray-800 rounded-box grid h-[600px] flex-grow lg:flex-grow-0 lg:w-1/4 place-items-center">
  

  <div className=" flex flex-col gap-3  mb-40 ">
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Bet Amount:</span>
    <input type="text" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>
 
 

  <label className="flex flex-col">
    <span className=" text-white font-bold ">Profit on Win:</span>
    <input type="text" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>

  <button className="btn btn-wide  btn-success">Bet</button>
  
  </div>
  
 
  </div>
  <div className="divider lg:divider-horizontal ">OR</div>
  <div className="card bg-gray-800 rounded-box grid h-[600px]  flex-grow lg:flex-grow-0 lg:w-3/4 place-items-center">


  <div className=" mb-10">
  <div>
       <div className="text-white font-mono font-bold text-center mb-10 mt-10">Roll!!</div>
      <RangeSlider
        className="single-thumb"
        defaultValue={[0, 100]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
        
       onInput={(value,index) => setValue(value)}
    
     


      />


     
    </div>
  </div>


  <div className=" md:flex gap-3 ">
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Multiplier:</span>
    <input type="text" className="bg-gray-300 input input-bordered" placeholder="0"/>
  </label>
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Range:</span>
    <input type="text" value={value[1]} className="bg-gray-300 input input-bordered " placeholder="0"/>
  </label>
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Win Chance:</span>
    <input type="text" className="bg-gray-300   input input-bordered" placeholder="0"/>
  </label>
  </div>


  </div>
</div>


    </div>
  )
}

export default Dice