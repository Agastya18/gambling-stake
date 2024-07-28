import { OnRampTransactions } from "../components/OnRampTransactions";
import axios from "axios";
import { useState,useEffect } from "react";
import Layout from "../components/Layout";
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const getTransactions = async () => {
        const response = await axios.get("http://localhost:3000/wallet/get-transactions",{
            withCredentials: true
            
            
        });
        setTransactions(response.data);
        console.log(response.data)
      }

      useEffect(() => {
        getTransactions();
       
      }, []);
  return (
    <Layout>

        <div className=" items-center w-full ">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>

    </div>
    </Layout>
  )
}

export default Transactions