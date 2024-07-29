import { useState } from "react";
import { Button } from "./button";
import { Card } from "./cards";
//import { Center } from "./Center";
import { Select } from "./Select";
import { TextInput } from "./TextInput";
import axios from "axios";
import { useStore } from "../zustand/store";

const SUPPORTED_BANKS = [{
    name: "Razorpay",
  //  redirectUrl: "https://netbanking.hdfcbank.com"
}];



export const AddMoney = () => {
    const{authUser} = useStore();


    const [amount,setAmount] = useState(0);
    const [name, setName] = useState(SUPPORTED_BANKS[0]?.name);

    const addMoney = async (amount,name) => {
        const resp= await axios.post("/api/wallet/onramp", {
            amount: amount,
            provider: name
        });
        console.log("onramp data--",resp);
        
        //window.location.reload();
        try {
     const {data:orders} = await axios.post("/api/wallet/checkout", {
            amount: resp.data.transaction.amount,
           
        });
        console.log("this is orders frontend",orders);
      

       const options = {
        // key: import.meta.env.RAZORPAY_API_KEY,
        key: import.meta.env.RAZORPAY_API_KEY,
        amount: orders.order.amount,
        currency: orders.order.currency,
        name: 'Stake-gambling',
        description: 'deposit money on wallet',
        order_id: orders.order.id,
        handler: function (response) {
            console.log(response);
            //alert(response);

        },
        prefill: {
            name: authUser?.user.username,
            
        },
        theme: {
            color: '#3399cc'
        },
        notes: {
             // Include the token here
             token: resp.data.token
          },
    };
    // const rzp1 = new (window as any).Razorpay(options);
    // rzp1.open();
   // console.log("above razorpay")
    const rzp1 = new window.Razorpay(options);
        rzp1.open();
            
        } catch (error) {
            console.log(error);
            
        }
        


    }
    
    // const handlePayemt = async (amount:number) => {
     

    // }

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value))


        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setName(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={() => {

                addMoney(amount,name);
               // handlePayemt(amount); 
                
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}