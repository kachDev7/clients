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
    }, [router])

    const Transfer = () => {
        return(
            <div className="container">
                <h1>Transfer</h1>
                <Table users={sentAmount} />
            </div>
        )
    }
    const Recieved = () => {
        return(
            <div className="container">
                <h1>Recieved</h1>
                <Table users={recieved} />
            </div>
        )
    }

    // Table
    const Table = ({users}) => {
        return(
            <table className="table table-success table-striped br-20">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <InnerTable users={users} />
                </tbody>
            </table>
        )
    }
    const InnerTable = ({users}) => {
        return(
            <>
                {users.map((item) => {
                   return (
                    <tr key={item.name}>
                        <td scope="row" className="">{item.name}</td>
                        <td>{item.amount}</td>
                        <td className="color1-bg">{item.date}</td>
                    </tr>
                   )
                })}
            </>
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