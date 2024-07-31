import Layout from "../components/Layout";
import { AddMoney } from "../components/AddMoneyCard";
import { BalanceCard } from "../components/BalanceCard";
import { OnRampTransactions } from "../components/OnRampTransactions";
import axios from "axios";
import { useState,useEffect } from "react";

import { useStore } from "../zustand/store";



const Transfer = () => {
  const {setBalance,balance} = useStore();
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  
//console.log(transactions)
  

  
  useEffect(() => {
    const getTransactions = async () => {
      const response = await axios.get("/api/wallet/get-transactions");
      setTransactions(response.data);
     // console.log(response.data)
    }
    getTransactions();
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      const resp = await axios.get("/api/wallet/get-balance");
     // console.log(resp)
     // setAmount(resp.data.balance.amount);
      setBalance(resp.data.balance.amount);
  
    
    }
    getBalance();
  }, [setBalance]);

  //console.log("trasfer amount",amount)
 
  return (
    <Layout>
      <div className="w-screen  ">
       
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance || 0} locked={0} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Transfer