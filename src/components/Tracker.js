import { useState, useEffect } from "react";


export default function Tracker(){
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [amountArray, setAmountArray] = useState([]);
    const [id, setId] = useState(0);
    const [balance, setBalance] = useState(0);
    const [positiveBalance, setPositiveBalance] = useState(0);
    const [negativeBalance, setNegativeBalance] = useState(0);
    const pattern = /^-?[0-9]+$/

    useEffect(() => {
        // console.log(amountArray);        
        
        setBalance(positiveBalance + negativeBalance);
    }, [amountArray, positiveBalance, negativeBalance]);

    // funcion para añadir una transaccion a la tabla
    function addTransaction(name, amount){
        // console.log(name+" | "+amount);

        const positive = amount >= 0;

        const newTrack = {
            id: id,
            name: name,
            amount: amount,
            isPositive: positive,
        }

        setAmountArray((amountArray) => [...amountArray, newTrack])


        if(positive){
            setPositiveBalance(Number(positiveBalance) + Number(amount));
        } else {
            setNegativeBalance(Number(negativeBalance) + Number(amount));
        }

        setId(id + 1);
    };

    return(
        <>
            <h1>Expense Tracker</h1>
            <p>Your <b className="text-uppercase">Balance</b></p>
            <h2 className="fw-bold fs-1">$<span>{balance}</span></h2>
            <div className="d-flex flex-row justify-content-center bg-dark text-white py-1 mx-5 mb-4 rounded">
                <div className="px-5 border-end">
                    <h3>Income</h3>
                    <p className="text-success fs-2">${positiveBalance}</p>
                </div>
                <div className="px-5">
                    <h3>Expense</h3>
                    <p className="text-danger fs-2">${negativeBalance}</p>
                </div>
            </div>
            <div className="h-25 mb-5">
                <h3 className="border-bottom border-secondary-subtle mx-5">History</h3>
                <div className="overflow-y-auto h-100">
                    {amountArray.map((a) => (
                        <div key={a.id} className="font-monospace d-flex flex-row justify-content-between rounded bg-light px-3 mx-5 my-1">
                            <p className="text-capitalize">{a.name}</p>
                            <p className={a.isPositive ? "text-success" : "text-danger"}>${a.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 mx-5">
                <h3 className="border-bottom border-secondary-subtle">Add now transaction</h3>
                <p className="fw-bold">Text</p>
                <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} name="tName" placeholder="Transaction name..."/>
                <p className="fw-bold">Amount</p>
                <p>negative - expense, positive - income</p>
                <input 
                className="form-control" 
                onKeyDown={(e) => {
                    if(e.key === 'Enter') addTransaction(name, amount);
                }} 
                pattern={pattern} 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                name="tAmount" 
                placeholder="Transaction amount..."/> <br/>
                <button className="btn btn-warning" onClick={()=> addTransaction(name, amount)}>Add Transaction</button>
            </div>
        </>
    );
}