import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [recieved, setRecieved] = useState([])
    const [balance, setBalance] = useState(0)
    const [sentAmount, setSentAmount] = useState([])

    useEffect(() => {
    const router = useRouter();

    const populateUser = async () => {
        console.log(localStorage.getItem('token'))
        const res = await fetch('http://localhost:8080/api/quote', {
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        const data = await res.json();
        console.log(data);

        setUserData(data.user);
        setBalance(userData.amount)
        setRecieved(data.user.recieved)
        setSentAmount(data.user.sentAmount)
        console.log(recieved)
        console.log(sentAmount)
    }

    
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token');
                console.log("I'm here")
                router.push('/')

            }else{
                populateUser();
            }
        }else{
            router.push('/login')
        }
    }, [])

    const Transfer = () => {
        return(
            <div className="container">
                <h1>Transfer</h1>
                {sentAmount.map((item) => {
                    return(<h1 key={item.name}>{item.name}</h1>)
                })}
            </div>
        )
    }
    const Recieved = () => {
        return(
            <div className="container">
                <h1>Recieved</h1>
                {recieved.map((item) => {
                   return (<h1 key={item.name}>{item.name} : {item.amount} : {item.date}</h1>)
                })}
            </div>
        )
    }

    return(
        <div className="container">
            <h1>Name :{userData.name} </h1>
            <h1>Amount :{balance} </h1>
            <Transfer />
            <Recieved />
            
        </div>
    )
}

export default Profile