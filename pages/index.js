import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // handle submit
  const hanldeSubmit = async (event) => {
    event.preventDefault()

    await fetch('https://secure-oasis-37765.herokuapp.com/api/register', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name" : name,
        "email" : email,
        "password" : password
      })
    }).then(async res => {
      const data = await res.json();
      console.log(data)
      if(res.ok){
        router.push('/login');
      }
    })
  }
  return (
    <div className="myBg">
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
        <form className=" container myForm mb-5 p-3 bg-body" onSubmit={hanldeSubmit}>
          <h3 className="text-center">Register</h3>
          <label htmlFor="Name" className='form-label'>Name</label>
          <input type="text" name="name" onChange={(e) => { setName(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
          <label htmlFor="password" className='form-label'>Email</label>
          <input type="email" name="email" onChange={(e) => { setEmail(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
          <label htmlFor="" className='form-label'>Password</label>
          <input type="password" name="password" onChange={(e) => { setPassword(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
          <button type="submit" className="btn btn-primary myBtn px-3">Submit</button>
        </form>

        <div className="container text-center mb-3">
          Already have an account? <Link href="/login"><a className="t-a">Login</a></Link>
        </div>
      </main>
    </div>
  )
}
