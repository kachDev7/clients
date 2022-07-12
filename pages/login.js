import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
        alert("Login Successfully!")
        router.push("/profile")
      }
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>New Standard App</title>
        <meta name="Standard trust group" content="Your favorite banking site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Standard Trust Group</h1>
        <form className="container" onSubmit={hanldeLogin}>
          <h3>Login</h3>
          <label htmlFor="" className='form-label'>Email</label>
          <input type="email" name="email" onChange={(e) => { setEmail(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
          <label htmlFor="" className='form-label'>Password</label>
          <input type="password" name="password" onChange={(e) => { setPassword(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
          <button type="submit" className="btn btn-primary px-3">Submit</button>
        </form>
      </main>
    </div>
  )
}
