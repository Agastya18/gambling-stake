import axios from 'axios';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../components/style.css';
import { useState,useEffect } from 'react';
const Dice = () => {

  const [betAmount, setBetAmount] = useState(0);
  const [profitOnWin, setProfitOnWin] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [rollOver, setRollOver] = useState(50);
  const [winChance, setWinChance] = useState(50);
  const calculateValues = (multiplier) => {
    const winChance = Math.floor(100 / multiplier);
    const rollOver = 100 - winChance;
    return { rollOver, winChance };
  };
  useEffect(() => {
    const { rollOver, winChance } = calculateValues(multiplier);
    setRollOver(rollOver);
    setWinChance(winChance);
    setProfitOnWin(betAmount * multiplier);
    
  }, [multiplier,betAmount]);

  // const [value, setValue] = useState([]);
  //   console.log(value[1])

    const handleBetAmountChange = (event) => {
      const newBetAmount = Math.floor(event.target.value);
      setBetAmount(newBetAmount);
      setProfitOnWin(newBetAmount * multiplier);
    };
  
    const handleMultiplierChange = (event) => {
      const newMultiplier = Math.floor(event.target.value);
      setMultiplier(newMultiplier);
      const { rollOver, winChance } = calculateValues(newMultiplier);
      setRollOver(rollOver);
      setWinChance(winChance);
      setProfitOnWin(betAmount * newMultiplier);
    };
  
    const handleRollOverChange = (event) => {
      const newRollOver = Math.floor(event.target.value);
    setRollOver(newRollOver);
    const newWinChance = 100 - newRollOver;
    setWinChance(newWinChance);
    const newMultiplier = Math.floor(100 / newWinChance);
    setMultiplier(newMultiplier);
    setProfitOnWin(betAmount * newMultiplier);
    };
  
    const handleRangeSliderChange = (value) => {
      const newRollOver = Math.floor(value[1]);
      setRollOver(newRollOver);
      const newWinChance = 100 - newRollOver;
      setWinChance(newWinChance);
      const newMultiplier = Math.floor(100 / newWinChance);
      setMultiplier(newMultiplier);
      setProfitOnWin(betAmount * newMultiplier);
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post('/api/game/dice', {
          betAmount,
          multiplier,
          rollOver,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
      
   
    
  
  
  return (
    <div className="bg-gray-900 min-h-screen ">
      <h1 className="text-3xl text-center  font-bold text-white ">Dice</h1>
     
  <div className="flex w-full flex-col lg:flex-row ">
  <div className="card bg-gray-800 rounded-box grid h-[600px] flex-grow lg:flex-grow-0 lg:w-1/4 place-items-center">
  

  <div className=" flex flex-col gap-3  mb-40 ">
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Bet Amount:</span>
    <input  value={betAmount} onChange={handleBetAmountChange} type="number" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>
 
 

  <label className="flex flex-col">
    <span className=" text-white font-bold ">Profit on Win:</span>
    <input value={Math.floor(profitOnWin)} readOnly type="number" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>

  <button onClick={handleSubmit} className="btn btn-wide  btn-success">Bet</button>
  
  </div>
  
 
  </div>
  <div className="divider lg:divider-horizontal ">OR</div>
  <div className="card bg-gray-800 rounded-box grid h-[600px]  flex-grow lg:flex-grow-0 lg:w-3/4 place-items-center">


  <div className=" mb-10">
  <div className="">
       <div className="text-white  font-serif font-bold text-center mb-4 mt-10 ">Roll!!</div>
       <div className=" bg-gray-900 p-6  rounded-xl">
       <div className="  text-orange-200 md:flex  md:justify-between">
        <div>0</div>
      
        <div className=" ml-3">50</div>
        <div>100</div>
       </div>
      <RangeSlider
        className="single-thumb  "
        defaultValue={[0, rollOver]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
        
        
        
        
       
        
       onInput={handleRangeSliderChange}
    
     


      />
       </div>
      
    </div>
  </div>


  <div className=" md:flex gap-3 ">
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Multiplier:</span>
    <input value={multiplier} onChange={handleMultiplierChange} type="number" className="bg-gray-300 input input-bordered" placeholder="0"/>
  </label>
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Roll Over:</span>
    <input type="number" onChange={handleRollOverChange} value={rollOver} className="bg-gray-300 input input-bordered " placeholder="0"/>
  </label>
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Win Chance%:</span>
    <input type="text" value={winChance} readOnly className="bg-gray-300   input input-bordered" placeholder="0"/>
  </label>
  </div>


  </div>
</div>


    </div>
  )
}

export default Dice