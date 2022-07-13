import Link from "next/link";
import Image from 'next/image'

const Navbar = () => {


    // Component Return
    return (
        <nav className="navbar navbar-expand-md bg-body navbar-body myNavv py-3">
        <div className="container">
            {/* <!-- Brand --> */}
            <Image src="/logo.png" height={50} width={50} className="circle" />
            <h4><span className="text-primary">Standard</span> Trust Group</h4>

            {/* <!-- Hambuger menu : visible @md --> */}
            <h1 className="fw-bold d-flex jac"  data-bs-toggle="collapse" data-bs-target="#navmenu">
                 <span className="text-primary">...</span>
            </h1>
            {/* <!-- Nav links --> */}
            <div className="collapse navbar-collapse text-center" id="navmenu">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link href='/login'><a className="nav-link fw-bold">Sign In</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/'><a className="nav-link fw-bold">Sign Up</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href='/about'><a className="nav-link fw-bold">About Us</a></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;