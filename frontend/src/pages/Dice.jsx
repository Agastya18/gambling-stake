import axios from 'axios';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../components/style.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useStore } from '../zustand/store';
import Table from '../components/Table';

const GreenSlider = styled(Slider)(({ theme }) => ({
  color: '#f44336',  // Set the color to green
  height: 8,
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#2196f3',
    border: '2px solid currentColor',
   
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    height: 12,
  },
  '& .MuiSlider-rail': {
    color: '#4caf50',
    opacity: 1,
    height: 8,
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#ffffff', // White color for the marks
    height: 8,
    width: 1,
    marginTop: -4,
  },
  '& .MuiSlider-markActive': {
    backgroundColor: '#4caf50',
  },
}));
const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 75,
    label: '75',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

const Dice = () => {
  const {setBalance,balance,authUser,setGames , Games}= useStore()
  const [getgames,setGetGames] =useState([])
 // console.log(getgames)
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
  

    useEffect(() => {
     // console.log(Games)
      const getBalance = async () => {
        const resp = await axios.get("/api/wallet/get-balance");
      //  console.log(resp)
       setBalance(resp.data.balance.amount);
       
     
      }
      getBalance();
     
    },[])
    // const getBalance = async () => {
    //   const resp = await axios.get("/api/wallet/get-balance");
    // //  console.log(resp)
    //  setBalance(resp.data.balance.amount);
     
   
    // }
   

    const handleSubmit = async () => {
      
      if (parseInt(betAmount) <= balance) {
        try {
          const response = await axios.post('/api/game/dice', {
            betAmount,
            multiplier,
            rollOver,
          });
          setBalance(response.data.newBalance);
         // console.log("game result",response.data);
        // getBalance();
         
          const getgame=await axios.get('/api/game/get-games');
          //setGetGames(getgame.data);
          setGames(getgame.data);
          
         // console.log("getgame",getgame.data);
        // console.log(Games)

  
        } catch (error) {
          console.error(error);
        }
        
        
      } else {
       window.alert('Insufficient balance in wallet');
      
    }
    }
      
   
    
  
  
  return (
    <div className="bg-gray-900 min-h-screen ">
      <h1 className="text-3xl text-center  font-bold text-white ">Dice</h1>
     
  <div className="flex w-full flex-col lg:flex-row ">
  <div className="card bg-gray-800 rounded-box grid h-[700px] flex-grow lg:flex-grow-0 lg:w-1/4 place-items-center">
  

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
  <div className="card bg-gray-800 rounded-box grid h-[700px]  flex-grow lg:flex-grow-0 lg:w-3/4 place-items-center">

  <Box  sx={{ 
        width: '100%', 
        maxWidth: '850px', 
        padding: '16px',
        '@media (min-width: 600px)': {
          maxWidth: '600px',
        },
        '@media (min-width: 960px)': {
          maxWidth: '800px',
        },
        '@media (min-width: 1280px)': {
          maxWidth: '850px',
        },
        margin: 'auto' }}>
  <GreenSlider
    defaultValue={50}
    getAriaValueText={valuetext}
    valueLabelDisplay="on"
    step={1}
    marks={marks}
    min={0}
    max={100}
    onChange={handleRollOverChange}
    value={rollOver}
   
  
  />
</Box>


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

  <div className="  bg-gray-900  rounded-md">
  {
    
    authUser && <Table games={ Games}/> 
  }
  </div>


  </div>
</div>


    </div>
  )
}

export default Dice