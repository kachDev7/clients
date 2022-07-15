import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [info, setInfo] = useState(false)

  // handle submit
  const hanldeLogin = async (event) => {
    event.preventDefault()

    await fetch('https://secure-oasis-37765.herokuapp.com/api/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    }).then(async res => {
      const data = await res.json();
      console.log(data)

      if(data.user){
        localStorage.setItem('token', data.token)
        // alert("Login Successfully!")
        router.push("/profile")
      }else{
        setInfo(true)
      }
    })
  }

  // Alert
  const Info = () => {
    return(
      <div className="alert alert-danger" role="alert">
        Incorrect <strong>Password</strong> or <strong>Email</strong>.
      </div>
    )
  }
  return (
    <div className="">
      <Head>
        <title>New Standard App</title>
        <meta name="Standard trust group" content="Your favorite banking site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-3">
        <div className="d-flex jac column">
          <Image src="/logo.png" height={80} width={80} className="circle" />
          <h1 className='my-3 mb-5'>Standard Trust Group</h1>
        </div>
        <form className="container myForm mb-5 p-3" onSubmit={hanldeLogin}>
          <h3 className='text-center'>Sign In</h3>
          {/* alert */}
          {info && <Info />}
          <label htmlFor="" className='form-label'>Email</label>
          <input type="email" name="email" onChange={(e) => { setEmail(e.target.value); setInfo(false)}} className='form-control mb-3 input-width mb-4'  />
          <label htmlFor="" className='form-label'>Password</label>
          <input type="password" name="password" onChange={(e) => { setPassword(e.target.value); setInfo(false)}} className='form-control mb-3 input-width mb-4'  />
          <button type="submit" className="myBtn btn btn-primary px-3">Submit</button>
        </form>

        <div className="container text-center mb-3">
          <p className="lead">Don't have an Account yet? <Link href="/"><a className="t-a">Create Account</a></Link></p>
        </div>
      </main>
    </div>
  )
}
