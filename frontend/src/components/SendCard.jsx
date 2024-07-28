
import { useState } from "react";

import { Button } from "./button";
import { Card } from "./cards";
import { Center } from "./Center";

import { TextInput } from "./TextInput";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    console.log(number)

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={() => {

                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}