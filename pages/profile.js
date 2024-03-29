import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

let count1 = 0;

setInterval(() => {
    count1 += 1
    
    if(count1 === 4){
        count1 = 1
    }
    switch (count1) {
        case 1:
            
            document.getElementById('c-slider').style.left = "0vw";
            break;
        case 2:
            
            document.getElementById('c-slider').style.left = "-80vw";
            break;
        case 3:
        
            document.getElementById('c-slider').style.left = "-160vw";
            break;
    
    }
}, 3000);



export default function Home() {

    const [userData, setUserData] = useState({})
    const [tfAmount, setTfAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    const [token, setToken] = useState(0)
    const [tfName, setTfName] = useState("");
    const [tfReturned, setTfReturned] = useState(false);
    const [tfSuccess, setTfSuccess] = useState(false);
    const [free, setFree] = useState(0);
    const [count, setCount] = useState(1)




    const router = useRouter();

    const populateUser = async (token) => {
        const res = await fetch('https://stan-server.vercel.app/api/quote', {
            headers : {
                'x-access-token' : token
            }
        })
        const data = await res.json();
        if(data.user.blocked === "yes"){
            router.push('/login')
        }else{
        let myCurrency = Intl.NumberFormat('en-US');
        setUserData(data.user);
        setBalance(myCurrency.format(data.user.amount))
        setFree(1)
        // console.log(localStorage.getItem('token'))
        }

    }

    // handleTranfer
    const handleTransfer = async (event) => {
        event.preventDefault()
        setTfReturned(false)
        setTfSuccess(false)
        // console.log(Number(userData.token))
        // console.log(Number(token))
        if(Number(tfAmount) > Number(balance)){
            alert("Try a lesser Amount");
            setTfReturned(true)
        }else{
            if(Number(token) === Number(userData.token)){
                // make transfer
    
                const res = await fetch('https://stan-server.vercel.app/api/transfer', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                       "tfAmount" : tfAmount,
                       "tfName" : tfName,
                        "userEmail": userData.email
                    })
                })
                if(res){
                    setTfReturned(true)
                    if(res.ok){
                        setTfSuccess(true)
                    }
                }
                const newBalance = await res.json()
                setBalance(newBalance.newBalance)
                // console.log(newBalance);
    
            }else{
                // alert token error
                setTfReturned(true)
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
                // console.log("I'm here")
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
            <div className="px-2 myBox br-5 bg-body">
                <div className="box-holder d-flex">
                    {/* Profile Image */}
                    <div className="r-boda w-100">
                        <div className="d-flex  jaa column my-3 text-center">
                            <div className="circle boda-s d-flex jac detailsImageBox">
                                <Image src={userData.photo} alt="Image" height={100} width={100} className="circle boda-s" />
                            </div>
                            <div className="pl-20">
                                <p className="mt-2 text-secondary"><i className="bi bi-credit-card-2-back mx-1"></i>Account Number</p>
                                <h4 className="text-center">{userData.accNo}</h4>
                                <span className="text-primary fw-bold">Active</span>
                            </div>
                        </div>
                    </div>
                    <div className=" w-100">
                        <div className="detailsTextBox d-flex jab column my-3">
                            <div className="mt-3">
                                <p className="text-secondary"><i className="bi bi-person mx-1"></i>Account Name</p>
                                <h4 className="">{userData.name}</h4>
                            </div>
                            <div className="mt-5">
                                <p className="text-secondary"><i className="bi bi-coin mx-1"></i>Balance</p>
                                <h5 className="text-success  fs ">${balance}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    

  
    // Carousel
    const Carousel = () => {

        
        
        return (
            <div className="d-flex jac py-5 d-sm-none">
                <div id="c-holder" className="c-w br-10">
                    <div className="c-slider d-flex" id="c-slider">
                        <div className="c-item c-w">
                            <img src="/blog-2.png" className="c-image" alt="..." />
                        </div>
                        <div className="c-item c-w">
                            <img src="/blog-1.png" className="c-image" alt="..." />
                        </div>
                        <div className="c-item c-w">
                            <img src="/blog1.jpg" className="c-image" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    // Action Div
    const Action = () => {
        return(
            <div className="container my-3 bg-body p-5 br-10">
                <div className="actionHolder container text-center d-md-flex jaa">
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

    const Loader = () => {
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    const Alert = () => {
        return(
            <div className="text-center">
                {tfSuccess ? 
                <div className="d-flex column text-primary">
                    <i className="bi bi-check2-circle h1 "></i>
                    <h1>Sent</h1>
                    <p className="text-dark">Transfer to <strong>{tfName}</strong> was successful!</p>
                    <button className="t-button" data-bs-dismiss="modal" data-bs-target="#exampleModal2"><Link href='/dashboard/#newly'><a className="t-a">View in Bank Statement <i className="bi bi-arrow-right"></i></a></Link></button>
                </div> :
                    <div className="d-flex column text-danger">
                        <i className="bi bi-x-circle h1"></i>
                        <h1>Failed</h1>
                        <p className="text-dark">Transfer to <strong>{tfName}</strong> failed. Try again Later!</p>
                        <button className="btn btn-primary px-3 m-3" data-bs-dismiss="modal" data-bs-target="#exampleModal2">Ok</button>
                    </div>
                 }
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

    // body
    const Body = () => {
        return(
            <div className="container">
                <Details />
                <Carousel />
                <Action />

                <div className="spread d-md-flex jab owner py-5">
                    <div className="container my-5">
                        <h1 className="fw-bold text-center text-primary">Why Us?</h1>
                        <p className="lead text-center">
                        It is with uthmost care and sensitivity we meticulously safe guard your privacy, we employ the most modern and advanced encryption methods in our security and privacy protection algorithms. your safety is our future as partners.
                        </p>
                    </div>
                </div>

            </div>
        )
    }
    return(
        <div className="owner py-5">
            <Head>
                <title>Profile - Standard Trust Group</title>
                <meta name="Profile - Standard Trust Group" content="Your favorite trustworthy banking platform" />
                <link rel="icon" href="/logo.png" />
            </Head>
            {/* Account Details  */}
            {free ? <Body /> : <Waiter />}
            

            {/* This is the modal region */}


            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="text-center">
                        <button type="button" className="btn-close py-4" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="myFlag py-3 mx-3">
                            <h1 className="modal-title" id="exampleModalToggleLabel">Transfer Funds</h1>
                        </div>
                    </div>
                    <div className="modal-body">

                        {/* Transfer form */}
                        <form className="my-3">
                            <h5>Recipient Details</h5>
                            <input type="text" placeholder="Account Name" onChange={(e) => { setTfName(e.target.value)}} className='form-control mb-3 input-width mb-4' required />
                            <input type="number" placeholder="Account Number"  className='form-control mb-3 input-width mb-4' required />
                            <div className="d-flex jac">
                                <input type="number" placeholder="Amount" onChange={(e) => { setTfAmount(e.target.value)}} className='form-control mb-3 input-width mb-4 mx-2' required />
                                <input type="text" placeholder="Swift ID"  className='form-control mb-3 input-width mb-4 ' required />
                            </div>
                            <input type="text" placeholder="Bank Name" className='form-control mb-3 input-width mb-4' required />
                            <div className="d-flex jac">
                                <input type="text" placeholder="Route Number" className='form-control mb-3 input-width mb-4 mx-2' required />
                                <input type="text" placeholder="Bank Address"  className='form-control mb-3 input-width mb-4 ' required />
                            </div>
                            <input type="text" placeholder="Narration" className='form-control mb-3 input-width mb-4' required />
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
                            <h1 className="modal-title text-center" id="exampleModalToggleLabel2">OTP</h1>
                            <p className="text-center lead">
                                Provide <strong>OTP</strong> sent to your email.
                            </p>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleTransfer}>
                                <input type="number" onChange={(e) => { setToken(e.target.value)}} className='form-control mb-3 input-width mb-4' required />
                                <button type="submit" className="btn btn-primary px-3 myBtn" data-bs-dismiss="modal" data-bs-target="#exampleModal2" data-bs-toggle="modal">Verify Transfer</button>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                        </div> */}
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-body">
                           {!tfReturned ? <Loader /> : <Alert />}
                        </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}
