import Card from "../components/Card"
import Carousel from "../components/Carousel"
import axios from "axios"
import { useEffect } from "react"
import { useStore } from "../zustand/store"
const Home = () => {
  const {setBalance} = useStore()
  useEffect(() => {
    // console.log(Games)
     const getBalance = async () => {
       const resp = await axios.get("/api/wallet/get-balance");
     //  console.log(resp)
      setBalance(resp.data.balance.amount);
      
    
     }
     getBalance();
    
   },[])
  return (
    <div className="bg-gray-900 text-white min-h-screen ">
        {/* <Carousel/> */}
       
       
    <Card/>
      
    </div>
  )
}

export default Home