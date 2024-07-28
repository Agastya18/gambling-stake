import Layout from "../components/Layout";
import { AddMoney } from "../components/AddMoneyCard";
import { BalanceCard } from "../components/BalanceCard";
import { OnRampTransactions } from "../components/OnRampTransactions";
import axios from "axios";
import { useState,useEffect } from "react";





const Transfer = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState();
  
//console.log(transactions)
  const getTransactions = async () => {
    const response = await axios.get("http://localhost:3000/wallet/get-transactions",{
      withCredentials: true
    
    });
    setTransactions(response.data);
   // console.log(response.data)
  }

  const getBalance = async () => {
    const resp = await axios.get("http://localhost:3000/wallet/get-balance",{
      withCredentials: true
    
    });
    //console.log(response)
    setAmount(resp.data.balance.amount);
  
  }

  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  //console.log("trasfer amount",amount)
 
  return (
    <Layout>
      <div className="w-screen ">
       
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={amount || 0} locked={0} />
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