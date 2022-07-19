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
  const [refCode, setRefCode] = useState(0);
  const [photo, setPhoto] = useState('')
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(false)

      // upload image to cloudinary
      const postImage = async (image) => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'sha-upload');
        const data = await fetch('https://api.cloudinary.com/v1_1/dgiqiys8o/image/upload', {
            method: 'POST',
            body: formData
        });

        // image object from cloudinary
        if(!data.ok){
            alert("Error Posting: Check Image")
            setLoading(false)
        }else{
            return data.json()
        }
    }
  // handle submit
  const hanldeSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    if(refCode !== "119905"){
      setInfo(true)
      setLoading(false)
      return;
    }

    Promise.all([postImage(photo)])

    .then(resImage => {
      console.log(resImage)
      fetch('https://secure-oasis-37765.herokuapp.com/api/register', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "name" : name,
          "email" : email,
          "password" : password,
          "photo" : resImage[0].secure_url
        })
      }).then(res => {
        console.log(res)
        if(res.ok){
          router.push('/login');
        }else{
          alert("Failed: Duplicate Email")
          setLoading(false)
        }
      })
    })


  }

  const Info = () => {
    return(
      <div className="alert alert-danger" role="alert">
        No match for <strong>Refferal Code</strong> .
      </div>
    )
  }
  return (
    <div className="myBg">
      <Head>
        <title>Register - Standard Trust Group</title>
        <meta name="Register - Standard Trust Group" content="Your favorite trustworthy banking platform" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="d-flex jac">
        <main className="p-3 max-w">
          <div className="d-flex jac column">
            <Image src="/logo.png" height={80} width={80} className="circle" />
            <h1 className='my-3 mb-5'>Standard Trust Group</h1>
          </div>
          <form className=" container myForm mb-5 p-3 bg-body" onSubmit={hanldeSubmit}>
            <h3 className="text-center">Register</h3>
            {info && <Info />}
            <label htmlFor="Name" className='form-label'>Name</label>
            <input type="text" name="name" onChange={(e) => { setName(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
            <label htmlFor="password" className='form-label'>Email</label>
            <input type="email" name="email" onChange={(e) => { setEmail(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
            <label htmlFor="" className='form-label'>Choose Password</label>
            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value)}} className='form-control mb-3 input-width mb-4'  />
            <label htmlFor="" className='form-label'>Refferal Code</label>
            <input type="number" name="number" onChange={(e) => { setRefCode(e.target.value); setInfo(false)}} className='form-control mb-3 input-width mb-4'  />
            <label htmlFor="image2" className='form-label'>Passport Sized Photo</label>
            <input type="file" name="image2" onChange={(e) => { setPhoto(e.target.files[0])}} className='form-control mb-3 input-width mb-4'  />
            {loading ? 
          <button className="btn btn-primary myBtn" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>

        :

          <button type="submit" className="lav myBtn btn btn-primary px-3">Sign In</button>}
          </form>

          <div className="container text-center lead mb-3">
            Already have an account?  <Link href="/login"><a className="t-a">Login</a></Link>
          </div>
        </main>
      </div>
    </div>
  )
}
