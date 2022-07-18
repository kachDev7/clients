import Link from "next/link";

const Footer = () => {
    return (
        <div className="do">
            <footer className="bg-dark me">
                {/* Follow icons */}
                <div className="d-flex align-items-center"></div>
                <div className="py-5 bg-dark text-center text-secondary">
                    <Link href='/'><a className="text-secondary nav-link fw-bold ">Sign Up</a></Link>
                    <Link href='/login'><a className=" text-secondary nav-link fw-bold">Log out</a></Link>
                    <Link href='/about'><a className="text-secondary nav-link fw-bold">About Us</a></Link>
                    <p>Standard Trust Group Copyright &copy; 2001-22</p>
                    <p className="fw-bold">Contact Us:</p>
                    <p className="lead">To Contact us kindly send an email to <strong>standardgroup319@gmail.com</strong></p>
                </div>
            </footer>
        </div>
    )
}

export default Footer;