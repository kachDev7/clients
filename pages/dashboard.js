import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [recieved, setRecieved] = useState([])
    const [balance, setBalance] = useState(0)
    const [sentAmount, setSentAmount] = useState([])


    const router = useRouter();

    const populateUser = async (token) => {
        //console.log(localStorage.getItem('token'))
        const res = await fetch('https://secure-oasis-37765.herokuapp.com/api/quote', {
            headers : {
                'x-access-token' : token
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token');
                console.log("I'm here")
                router.push('/')

            }else{
                populateUser(token);
            }
        }else{
            router.push('/login')
        }
    }, [populateUser(), router])

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