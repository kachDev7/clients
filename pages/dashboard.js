import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Image from "next/image";

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
                <h1 className="mb-2">Transfer</h1>
                <Table users={sentAmount} />
            </div>
        )
    }
    const Recieved = () => {
        return(
            <div className="container">
                <h1 className="mb-2">Recieved</h1>
                <Table users={recieved} />
            </div>
        )
    }

    // Table
    const Table = ({users}) => {
        return(
            <div className="mb-5">

            
                <table className="table table-primary table-striped br-20">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Amount($)</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InnerTable users={users} />
                    </tbody>
                </table>

            </div>
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

    // Account Details
    const Details = () => {
        return(
            <div className="px-2 myBox br-20 bg-body my-5">
                <div className="box-holder d-flex jaa">
                    {/* Profile Image */}
                    <div className="d-flex jac r-boda column my-3 text-center">
                        <div className="">
                            <p className="text-secondary"><i className="bi bi-person mx-1"></i>Account Name</p>
                            <h4 className="text-center">{userData.name}</h4>
                        </div>
                        <div className="px-3">
                            <p className="mt-2 text-secondary"><i className="bi bi-credit-card-2-back mx-1"></i>Account Number</p>
                            <h4 className="text-center">123456799</h4>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="d-flex jac column my-3 text-center">
                        <div className="">
                            <p className="text-secondary"><i className="bi bi-person-rolodex mx-1"></i>Swift Id</p>
                            <h4 className="text-center">564323</h4>
                        </div>
                        <div className="px-3">
                            <p className="mt-2 text-secondary"><i className="bi bi-shield-lock mx-1"></i>Secret PIN</p>
                            <h4 className="text-center">****</h4>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    return(
        <div className="container">
            <Details />
            <Transfer />
            <Recieved />
            
        </div>
    )
}

export default Profile