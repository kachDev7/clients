import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken';
import Link from 'next/link'
import Image from 'next/image'


export default function Home() {

    const [userData, setUserData] = useState({})
    const [tfAmount, setTfAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    const [token, setToken] = useState(0)
    const [tfName, setTfName] = useState("");


    const router = useRouter();

    const populateUser = async (token) => {
        const res = await fetch('https://secure-oasis-37765.herokuapp.com/api/quote', {
            headers : {
                'x-access-token' : token
            }
        })
        const data = await res.json();
        console.log(data);

        setUserData(data.user);
        setBalance(data.user.amount)
        console.log(localStorage.getItem('token'))
    }

    // handleTranfer
    const handleTransfer = async (event) => {
        event.preventDefault()
        console.log(Number(userData.token))
        console.log(Number(token))
        if(Number(tfAmount) > Number(balance)){
            alert("Try a lesser Amount");
        }else{
            if(Number(token) === Number(userData.token)){
                // make transfer
    
                const res = await fetch('https://secure-oasis-37765.herokuapp.com/api/transfer', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                       "tfAmount" : tfAmount,
                       "tfName" : tfName,
                        "userEmail": userData.email
                    })
                })
                const newBalance = await res.json()
                setBalance(newBalance.newBalance)
                console.log(newBalance);
    
            }else{
                // alert token error
                alert("incorrect token")
            }
        }
        
    }

    const brew = (event) =>{
        event.preventDefault();
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

    // Components
    
    // Account Details
    const Details = () => {
        return(
            <div className="px-2 myBox br-20 bg-body">
                <div className="box-holder d-flex jaa">
                    {/* Profile Image */}
                    <div className="d-flex jac r-boda column my-3 text-center">
                        <div className="circle boda-s d-flex jac detailsImageBox">
                            <Image src="/logo1.jpg" alt="Image" height={100} width={100} className="circle boda-s" />
                        </div>
                        <div className="px-3">
                            <p className="mt-2 text-secondary"><i className="bi bi-credit-card-2-back mx-1"></i>Account Number</p>
                            <h4 className="text-center">123456799</h4>
                            <span className="text-primary fw-bold">Active</span>
                        </div>
                    </div>
                    <div className="detailsTextBox py-3">
                        <p className="text-secondary"><i className="bi bi-person mx-1"></i>Account Name</p>
                        <h4 className="">{userData.name}</h4>
                        <p className="text-secondary mt-3"><i className="bi bi-coin mx-1"></i>Balance</p>
                        <h4 className="text-success fw-bold fs text-center">${balance}</h4>
                    </div>
                </div>
            </div>
        )
    }

    // Carousel
    const Carousel = () => {
        return (
            <div id="carouselExampleInterval" className="carousel slide my-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                    <Image src="/blog-1.png" className="d-block w-100" alt="Image" height={200} width={300} />
                    </div>

                    <div className="carousel-item" data-bs-interval="2000">
                    <Image src="/blog-2.png" className="d-block w-100" alt="Image" height={200} width={300} />
                    </div>

                    <div className="carousel-item" data-bs-interval="2000">
                    <Image src="/blog-3.png" className="d-block w-100" alt="Image" height={200} width={300} />
                    </div>
                </div>
            </div>
        )
    }


    // Action Div
    const Action = () => {
        return(
            <div className="container my-3 bg-body p-5 br-10">
                <div className="actionHolder container text-center">
                    <div className="br-10 myBox br-10 container py-3 my-5" data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                        <i className="bi bi-arrow-up-circle h1 text-primary"></i>
                        <h3>Transfer Funds</h3>
                        <p className="lead">Make a transfer to a local bank</p>
                    </div>
                    <Link href='/dashboard'>
                        <div className="myBox br-10 container py-3 my-5">
                            <i className="bi bi-journal-text h1 text-primary"></i>
                            <h3>Bank Statement</h3>
                            <p className="lead">Get your most recent transaction logs</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
    return(
        <div className="container owner py-5">
            {/* Account Details  */}
            <Details />
            <Carousel />
            <Action />
            

            {/* This is the modal region */}


            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="text-center">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="myFlag py-3 mx-3">
                            <h1 className="modal-title" id="exampleModalToggleLabel">Transfer Funds</h1>
                        </div>
                    </div>
                    <div className="modal-body">

                        {/* Transfer form */}
                        <form className="my-3">
                            <h5>Reciepiant Details</h5>
                            <input type="text" placeholder="Account Name" onChange={(e) => { setTfName(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
                            <input type="number" placeholder="Account Number"  className='form-control mb-3 input-width mb-4'  />
                            <div className="d-flex jac">
                                <input type="number" placeholder="Amount" onChange={(e) => { setTfAmount(e.target.value)}} className='form-control mb-3 input-width mb-4 mx-2'  />
                                <input type="number" placeholder="Swift ID"  className='form-control mb-3 input-width mb-4 '  />
                            </div>
                            <input type="text" placeholder="Bank Name" className='form-control mb-3 input-width mb-4'  />
                            <input type="text" placeholder="Naration" className='form-control mb-3 input-width mb-4'  />
                            <button onClick={brew} className="btn btn-primary px-3 myBtn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Transfer</button>
                        </form>

                    </div>
                    {/* <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
                    </div> */}
                    </div>
                </div>
                </div>
                <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="d-flex jac column py-2">
                        <button type="button" className=" mb-3 btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h1 className="modal-title text-center" id="exampleModalToggleLabel2">Verify Transfer</h1>
                        <p className="text-center lead">
                            Provide verification Code sent to your email.
                        </p>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleTransfer}>
                            <input type="number" onChange={(e) => { setToken(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
                            <button type="submit" className="btn btn-primary px-3 myBtn" data-bs-dismiss="modal">Verify</button>
                        </form>
                    </div>
                    {/* <div className="modal-footer">
                        <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                    </div> */}
                    </div>
                </div>
                </div>

        </div>
    )
}
