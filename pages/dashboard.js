import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'
import Image from "next/image";
import Head from "next/head";

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [recieved, setRecieved] = useState([])
    const [balance, setBalance] = useState(0)
    const [sentAmount, setSentAmount] = useState([])
    const [free, setFree] = useState(0);


    const router = useRouter();

    const populateUser = async (token) => {
        //console.log(localStorage.getItem('token'))
        const res = await fetch('https://stan-server.vercel.app/api/quote', {
            headers : {
                'x-access-token' : token
            }
        })
        const data = await res.json();
        // console.log(data);

        setUserData(data.user);
        setBalance(userData.amount)
        setRecieved(data.user.recieved)
        setSentAmount(data.user.sentAmount)
        setFree(1)
        // console.log()
        // console.log(sentAmount)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token');
                // console.log("I'm here")
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
                    const myAmount = Intl.NumberFormat("en-US")
                   return (
                    <tr key={item.date}>
                        <td scope="row" className="">{item.name}</td>
                        <td>{myAmount.format(item.amount)}</td>
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
            <div className="px-2  br-10 bg-body my-5 myCard">
                <div className="box-holder d-flex">
                    {/* Profile Image */}
                    <div className="r-boda w-100">
                        <div className="d-flex jac  column my-3 text-center">
                            <div className="">
                                <p className="text-secondary"><i className="bi bi-person mx-1"></i>Account Name</p>
                                <h4 className="text-center">{userData.name}</h4>
                            </div>
                            <div className="px-3">
                                <p className="mt-2 text-secondary"><i className="bi bi-credit-card-2-back mx-1"></i>Account Number</p>
                                <h4 className="text-center">{userData.accNo}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className=" w-100">
                        <div className="d-flex jac column my-3 text-center">
                            <div className="">
                                <p className="text-secondary"><i className="bi bi-person-rolodex mx-1"></i>Swift Id</p>
                                <h4 className="text-center">ADKBLTOY</h4>
                            </div>
                            <div className="px-3">
                                <p className="mt-2 text-secondary"><i className="bi bi-shield-lock mx-1"></i>Secret PIN</p>
                                <h4 className="text-center">****</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }




        // Waiter
        const Waiter = () => {
            return(
                <div className="d-flex jac column waiter">
                    <Image src="/logo.png" height={150} width={150} className="circle" />
                    <div className="py-3">
                        <Loader />
                    </div>
                </div>
            )
        }

        // Spinner
        const Loader = () => {
            return(
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }


    
        // body
        const Body = () => {
            return(
                    <div className="container">
                        <div className="text-center py-3 mt-5 myFlag">
                            <h4 className="text-center">Account Details</h4>
                        </div>            
                        <Details />
                        <div className="text-center mb-5 py-3 myFlag">
                            <h4 className="text-center">Account Statement</h4>
                        </div>
                        <Transfer />
                        <div id="newly"></div>
                        <Recieved />
                                
                    </div>
            )
        }
    return(
        <>
        <Head>
        <title>Dashboard - Standard Trust Group</title>
        <meta name="Dashboard - Standard Trust Group" content="Your favorite trustworthy banking platform" />
        <link rel="icon" href="/logo.png" />
      </Head>

        {free ? <Body /> : <Waiter />}
        {/* <Body /> */}
        </>
    )
}

export default Profile