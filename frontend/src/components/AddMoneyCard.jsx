import { useState } from "react";
import { Button } from "./button";
import { Card } from "./cards";
//import { Center } from "./Center";
import { Select } from "./Select";
import { TextInput } from "./TextInput";
import axios from "axios";


const SUPPORTED_BANKS = [{
    name: "Razorpay",
    redirectUrl: "https://netbanking.hdfcbank.com"
}];



export const AddMoney = () => {


    const [amount,setAmount] = useState(0);
    const [name, setName] = useState(SUPPORTED_BANKS[0]?.name);

    const addMoney = async (amount,name) => {
        const resp= await axios.post("http://localhost:3000/wallet", {
            amount: amount,
            provider: name
        },{
            withCredentials: true
        
        });
        console.log(resp);
        //refesh page
        //window.location.reload();
        try {
            const {data:orders} = await axios.post("http://localhost:3000/wallet/checkout-page", {
            amount: amount,
           
        },{
            withCredentials: true
        
        });
        console.log("this is orders frontend",orders);
        //console.log(orders.order);
      //  console.log(orders.order.amount);
        //refesh page
       // window.location.reload();
    //    const resp = await axios.get("http://localhost:3000/wallet",{
    //         withCredentials: true
            
            
    //     });
    //     console.log("this is resp",resp);

       const options = {
        // key: import.meta.env.RAZORPAY_API_KEY,
        key: "rzp_test_1DP5mmOlF5G5ag",
        amount: orders.order.amount,
        currency: orders.order.currency,
        name: 'Stake-gambling',
        description: 'Test Transaction stake',
        order_id: orders.order.id,
        handler: function (response) {
            console.log(response);
            //alert(response);

        },
        prefill: {
            name: 'agastya',
            email: 'email@example.com',
            contact: '9999999999'
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