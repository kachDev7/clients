import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    // State variables
    const [free, setFree] = useState(false);
    const [chgReturned, setChgReturned] = useState(false);
    const [chgSuccess, setChgSuccess] = useState(false)
    const [users, setUsers] = useState({})
    const [target, setTarget] = useState('')
    const [typUser, setTypUser] = useState('')
    const [field, setField] = useState('')

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

    const Alert = () => {
        return(
            <div className="text-center">
                {chgSuccess ? 
                <div className="d-flex column text-primary">
                    <i className="bi bi-check2-circle h1 "></i>
                    <h1>Done</h1>
                    <p className="text-dark"><strong>{field}</strong> updated successful!</p>
                    <button className="btn btn-primary px-3" data-bs-dismiss="modal" data-bs-target="#exampleModal2">Ok</button>
                </div> :
                    <div className="d-flex column text-danger">
                        <i className="bi bi-x-circle h1"></i>
                        <h1>Failed</h1>
                        <button className="btn btn-primary px-3" data-bs-dismiss="modal" data-bs-target="#exampleModal2">Ok</button>
                    </div>
                    }
            </div>
        )
    }

    // Get all Users
    const populateUsers = async () => {
        const res = await fetch('https://secure-oasis-37765.herokuapp.com/api/admin');
        if(res.ok){
            const usersRes = await res.json()
            setUsers(usersRes)
            setFree(true)
            console.log(users)
        }
    }

    const handleChange = async () => {
        const res = await fetch('https://secure-oasis-37765.herokuapp.com/api/update', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "typUser" : typUser,
                "target" : target,
                "field" : field
            })
        })
        if(res){
            setChgReturned(true)
            if(res.ok){
                const data = await res.json()
                console.log(data, "Done!")
                setChgSuccess(true)
            }else{
                setChgSuccess(false)
                console.log("failed!")
            }
        }
    }

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if(token){
        //     const user = jwt.decode(token)
        //     if(!user){
        //         localStorage.removeItem('token');
        //         console.log("I'm here")
        //         router.push('/')

        //     }else{
        //         populateUsers();
        //     }
        // }else{
        //     router.push('/login')
        // }

        populateUsers();
    }, [])

    const AdminDetails = () => {
        return(
            <div className="px-2  br-10 bg-body my-5 myCard">
            <div className="box-holder d-flex jaa">
                {/* Profile Image */}
                <div className="d-flex jac r-boda column my-3 text-center">
                    <div className="">
                        <p className="text-secondary"><i className="bi bi-person mx-1"></i>Website</p>
                        <p className="text-center">www.standardtrustgroup.com</p>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="d-flex jac column my-3 text-center">
                    <div className="">
                        <p className="text-secondary"><i className="bi bi-person-rolodex mx-1"></i>Email</p>
                        <p className="text-center">stg@gmail.com</p>
                    </div>
                </div>

            </div>
        </div>
        )
    }

    // All users
    const AllUSers = () => {
        return(
            <div className="container">
                {users.map(user => {
                    return(
                        <div className="container " key={user.email}>
                            <div className="my-5 p-3 myBox">
                                <Image src={user.photo} height={50} width={50} className="circle" />
                                <div className="d-flex jab boda-b py-2">
                                    <h4><span className='text-secondary'>Name :</span> {user.name}</h4>
                                    {/* <button onClick={( )=> {setTypUser(user.email)}} className="btn btn-primary px-3"  data-bs-target="#exampleModal" data-bs-toggle="modal">Change</button> */}
                                </div>
                                <div className="d-flex jab boda-b py-2">
                                    <h4><span className='text-secondary'>Email :</span> {user.email}</h4>
                                    {/* <button className="btn btn-primary px-3" onClick={( )=> {setTypUser(user.email)}} data-bs-target="#exampleModal2" data-bs-toggle="modal">Change</button> */}
                                </div>
                                <div className="d-flex jab boda-b py-2">
                                    <h4><span className='text-secondary'>User Token :</span> {user.token}</h4>
                                    <button className="btn btn-primary px-3" onClick={( )=> {setTypUser(user.email); setField("token")}} data-bs-target="#exampleModal" data-bs-toggle="modal">Change</button>
                                </div>
                                <div className="d-flex jab boda-b py-2">
                                    <h4><span className='text-secondary'>Balance :</span>  {user.amount}</h4>
                                    <button className="btn btn-primary px-3" onClick={( )=> {setTypUser(user.email); setField("amount")}} data-bs-target="#exampleModal" data-bs-toggle="modal">Change</button>
                                </div>
                                <div className="d-flex jab boda-b py-2">
                                    <h4><span className='text-secondary'>Password :</span>  {user.password}</h4>
                                    <button className="btn btn-primary px-3" onClick={( )=> {setTypUser(user.email); setField("password")}} data-bs-target="#exampleModal" data-bs-toggle="modal">Change</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    //Body
    const Body = () => {
        return(
            <div>
                    <div className="container pt-5">
                        <h1 className="fw-bold text-center">PROJECT ADMIN</h1>
                    </div>
                <AdminDetails />
                    <div className="container">
                        <h1 className="text-center">All Users</h1>
                    </div>
                <AllUSers />
            </div>
        )
    }

    // return
    return(
        <>
        {free ? <Body /> : <Waiter />}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="text-center py-3">New Value</h2>
                        <form onSubmit={handleChange}>
                            <input type="text" onChange={(e) => { setTarget(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
                            <button type="submit" className="btn btn-primary px-3 myBtn" data-bs-dismiss="modal" data-bs-target="#exampleModal2" data-bs-toggle="modal">Verify</button>
                        </form>
                        <p className="text-muted py-3">Note! Whatever changes you make here will reflect at the Database.</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        {!chgReturned ? <Loader /> : <Alert />}
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}