import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    return(
        <div className="myBg">
      <Head>
        <title>About - Standard Trust Group</title>
        <meta name="About - Standard Trust Group" content="Your favorite trustworthy banking platform" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className='container'>
        <div className="spread d-md-flex jab my-5">
            <div className="container d-flex jac">
                <Image src="/img5.jpg" height={250} width={250} alt="" className="circle " />
            </div>
            <div className="container my-3">
                <h1 className="fw-bold text-center text-primary">About Standard Trust Group</h1>
                <p className="lead text-center">
                We remain the most reliable online banking service of the decade.
Standard Trust Group offers accurate safe keeping of your cash and other valuables, as well as keeping you updated with financial Signals as regards our program.
We sincerely recommend you stick with us having proven trustworthy over the years as made evident following lots of awards bagged by the Company.
                </p>
            </div>

        </div>

        
        <div className="spread d-md-flex jab owner py-5">
            <div className="container my-5">
                <h1 className="fw-bold text-center text-primary">Why Us?</h1>
                <p className="lead text-center">
                It is with uthmost care and sensitivity we meticulously safe guard your privacy, we employ the most modern and advanced encryption methods in our security and privacy protection algorithms. your safety is our future as partners.
                </p>
            </div>
            <div className="container d-flex jac">
                <Image src="/img4.jpg" height={250} width={250} alt="" className='circle'/>
            </div>
        </div>

        <div className="container text-center h-100">
            <h1 className="fw-bold my-5 text-primary">
                We Serve You Better!
            </h1>
            <p className="lead">
            We bring to you a fast, reliable and optimal performing yet easy to use service to make your financial dealings seemless and effort free.
            </p>
        </div>
      </main>
      </div>
    )
}

