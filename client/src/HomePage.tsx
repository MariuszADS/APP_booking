import { Link } from "react-router"

type HomePageProps = {
    isLoggedIn: boolean
    isAdmin: boolean
}

function HomePage({ isLoggedIn, isAdmin }: HomePageProps) {
    return (
        <section className="front-page">
            <nav className="top-nav">
                <strong>Booking Studio</strong>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard">My bookings</Link>
                            {isAdmin && <Link to="/admin">Admin panel</Link>}
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="hero">
                <p className="eyebrow">Hairdresser appointments</p>
                <h1>Book a haircut without calling the salon.</h1>
                <p>
                    Choose a service, pick a date and keep all your appointments in one clear dashboard.
                    Admins can manage users, services and all reservations.
                </p>
                <div className="hero-actions">
                    <Link className="button-link" to={isLoggedIn ? "/dashboard" : "/register"}>
                        {isLoggedIn ? "Go to dashboard" : "Book appointment"}
                    </Link>
                    <Link className="button-link secondary-link" to={isLoggedIn ? "/dashboard" : "/login"}>
                        {isLoggedIn ? "View bookings" : "I already have account"}
                    </Link>
                </div>
            </div>

            <div className="feature-grid">
                <article>
                    <strong>For clients</strong>
                    <p>Register, log in and reserve a barber service in a few steps.</p>
                </article>
                <article>
                    <strong>For admins</strong>
                    <p>Preview users, bookings and available services from one panel.</p>
                </article>
                <article>
                    <strong>For portfolio</strong>
                    <p>JWT auth, Prisma relations, protected routes and full booking flow.</p>
                </article>
            </div>
        </section>
    )
}

export default HomePage
